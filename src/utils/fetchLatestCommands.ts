import path from 'node:path';
import {fileURLToPath} from 'node:url';

import fs from 'graceful-fs';
import https from 'https';

import {
  ArgumentItem,
  ArgumentsData,
  ArgumentSection,
  ArgumentType,
  DataSection,
} from '../../../src/common/types/plugins/modules';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ParsedArgument {
  name: string;
  description?: string;
  type: ArgumentType;
  defaultValue?: any;
  values?: string[];
  category?: string;
  section?: string;
}

interface ToolConfig {
  name: string;
  url: string;
  outputPath: string;
  hasEnvVars?: boolean;
}

const TOOLS: ToolConfig[] = [
  {
    name: 'ComfyUI',
    url: 'https://raw.githubusercontent.com/Comfy-Org/ComfyUI/refs/heads/master/comfy/cli_args.py',
    outputPath: path.join(__dirname, '../Container/Image/ComfyUI (comfyanonymous)/Arguments.ts'),
  },
  {
    name: 'ComfyUI Zluda',
    url: 'https://raw.githubusercontent.com/patientx/ComfyUI-Zluda/refs/heads/master/comfy/cli_args.py',
    outputPath: path.join(__dirname, '../Container/Image/ComfyUI Zluda (patientx)/Arguments.ts'),
    hasEnvVars: true,
  },
];

/**
 * Fetches content from a URL using https module
 */
function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          }
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

/**
 * Intelligently categorizes arguments into sections based on their names and descriptions
 */
function categorizeArgument(arg: ParsedArgument): string {
  const name = arg.name.toLowerCase();
  const desc = (arg.description || '').toLowerCase();

  // Network related
  if (
    name.includes('listen') ||
    name.includes('port') ||
    name.includes('tls') ||
    name.includes('cors') ||
    name.includes('upload') ||
    name.includes('compress') ||
    name.includes('api')
  ) {
    return 'Network';
  }

  // Path/Directory related
  if (
    name.includes('directory') ||
    name.includes('path') ||
    name.includes('config') ||
    name.includes('root') ||
    desc.includes('directory') ||
    desc.includes('path')
  ) {
    return 'Paths';
  }

  // Execution related
  if (
    name.includes('launch') ||
    name.includes('cuda-device') ||
    name.includes('default-device') ||
    name.includes('cuda-malloc')
  ) {
    return 'Execution';
  }

  // Precision/Data type related
  if (
    name.includes('fp') ||
    name.includes('bf16') ||
    name.includes('unet') ||
    name.includes('vae') ||
    name.includes('text-enc') ||
    desc.includes('precision') ||
    desc.includes('fp16') ||
    desc.includes('fp32')
  ) {
    return 'Precision';
  }

  // Optimization related
  if (
    name.includes('xformers') ||
    name.includes('attention') ||
    name.includes('channels') ||
    name.includes('directml') ||
    name.includes('oneapi') ||
    name.includes('ipex') ||
    name.includes('preview') ||
    name.includes('cache') ||
    name.includes('sage') ||
    name.includes('flash') ||
    name.includes('fast') ||
    desc.includes('optimization') ||
    desc.includes('performance')
  ) {
    return 'Optimizations';
  }

  // Memory management related
  if (
    name.includes('vram') ||
    name.includes('cpu') ||
    name.includes('gpu') ||
    name.includes('memory') ||
    name.includes('offload') ||
    name.includes('reserve') ||
    desc.includes('memory') ||
    desc.includes('vram')
  ) {
    return 'Memory Management';
  }

  // Everything else
  return 'Miscellaneous';
}

/**
 * Parses Python argparse code to extract argument definitions
 */
function parseArgumentsFromPython(content: string): ParsedArgument[] {
  const args: ParsedArgument[] = [];
  const lines = content.split('\n');

  let currentArg: Partial<ParsedArgument> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Match parser.add_argument or group.add_argument
    const argMatch = trimmed.match(/\.add_argument\(\s*['"](-{1,2}[^'"]+)['"]/);
    if (argMatch) {
      // Save previous argument if exists
      if (currentArg && currentArg.name) {
        args.push(currentArg as ParsedArgument);
      }

      // Start new argument
      currentArg = {
        name: argMatch[1],
        category: 'Command Line Arguments',
      };

      // Parse the rest of the add_argument call (might span multiple lines)
      let fullArgDef = line;
      let j = i;
      let openParens = (line.match(/\(/g) || []).length;
      let closeParens = (line.match(/\)/g) || []).length;

      while (j < lines.length && openParens > closeParens) {
        j++;
        if (j < lines.length) {
          fullArgDef += '\n' + lines[j];
          openParens += (lines[j].match(/\(/g) || []).length;
          closeParens += (lines[j].match(/\)/g) || []).length;
        }
      }
      i = j;

      parseArgumentDefinition(fullArgDef, currentArg);
    }
  }

  // Save last argument
  if (currentArg && currentArg.name) {
    args.push(currentArg as ParsedArgument);
  }

  // Categorize all arguments into sections
  for (const arg of args) {
    arg.section = categorizeArgument(arg);
  }

  return args;
}

/**
 * Parses a single add_argument definition to extract metadata
 */
function parseArgumentDefinition(argDef: string, arg: Partial<ParsedArgument>) {
  // Extract help text
  const helpMatch = argDef.match(/help\s*=\s*['"]([^'"]*(?:''[^'"]*)*)['"]/s);
  if (helpMatch) {
    arg.description = helpMatch[1].replace(/\\n/g, ' ').replace(/\s+/g, ' ').replace(/''/g, "'").trim();
  }

  // Extract default value
  const defaultMatch = argDef.match(/default\s*=\s*([^,)]+)/);
  if (defaultMatch) {
    let defaultVal = defaultMatch[1].trim();

    // Handle multi-line defaults
    if (defaultVal.includes('\n')) {
      defaultVal = defaultVal.split('\n')[0].trim();
    }

    // Remove quotes
    defaultVal = defaultVal.replace(/^['"]|['"]$/g, '');

    // Parse numbers
    if (!isNaN(Number(defaultVal)) && defaultVal !== '') {
      arg.defaultValue = Number(defaultVal);
    } else if (defaultVal !== 'None' && defaultVal !== 'False' && defaultVal !== 'True' && defaultVal !== '') {
      arg.defaultValue = defaultVal;
    }
  }

  // Determine argument type
  if (argDef.includes('action="store_true"') || argDef.includes("action='store_true'")) {
    arg.type = 'CheckBox';
  } else if (argDef.includes('choices=[') || argDef.includes('choices=(')) {
    arg.type = 'DropDown';
    // Extract choices
    const choicesMatch = argDef.match(/choices\s*=\s*[\[({]([^\])}]+)[\])}]/s);
    if (choicesMatch) {
      arg.values = choicesMatch[1]
        .split(',')
        .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(v => v && v !== '');
    }
  } else if (argDef.includes('type=int') || argDef.includes('type=float')) {
    arg.type = 'Input';
  } else if (
    arg.name?.toLowerCase().includes('directory') ||
    arg.name?.toLowerCase().includes('-dir') ||
    arg.name?.toLowerCase().includes('folder')
  ) {
    arg.type = 'Directory';
  } else if (
    arg.name?.toLowerCase().includes('file') ||
    arg.name?.toLowerCase().includes('path') ||
    arg.name?.toLowerCase().includes('config')
  ) {
    // Check if it's specifically a file or could be a directory
    if (arg.description?.toLowerCase().includes('directory') || arg.description?.toLowerCase().includes('folder')) {
      arg.type = 'Directory';
    } else {
      arg.type = 'File';
    }
  } else {
    arg.type = 'Input';
  }
}

/**
 * Converts parsed arguments to ArgumentsData structure
 */
function convertToArgumentsData(parsedArgs: ParsedArgument[], hasEnvVars: boolean = false): ArgumentsData {
  const categoriesMap = new Map<string, Map<string, ArgumentItem[]>>();

  // Group by category and section
  for (const arg of parsedArgs) {
    const category = arg.category || 'Command Line Arguments';
    const section = arg.section || 'General';

    if (!categoriesMap.has(category)) {
      categoriesMap.set(category, new Map());
    }

    const sectionsMap = categoriesMap.get(category)!;
    if (!sectionsMap.has(section)) {
      sectionsMap.set(section, []);
    }

    const item: ArgumentItem = {
      name: arg.name,
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      values: arg.values,
    };

    sectionsMap.get(section)!.push(item);
  }

  // Convert to ArgumentsData format
  const result: ArgumentsData = [];

  // Add environment variables section for Zluda
  if (hasEnvVars) {
    result.push({
      category: 'Environment Variables',
      items: [
        {
          name: 'PYTHON',
          description: 'Sets a custom path for Python executable.',
          type: 'File',
          defaultValue: '"%~dp0/venv/Scripts/python.exe"',
        },
        {
          name: 'VENV_DIR',
          description:
            'Specifies the path for the virtual environment. Default is venv. Special value' +
            ' - runs the script without creating virtual environment.',
          type: 'Directory',
          defaultValue: './venv',
        },
        {
          name: 'ZLUDA_COMGR_LOG_LEVEL',
          description: 'Zluda log level',
          type: 'Input',
          defaultValue: '1',
        },
      ],
    });
  }

  for (const [category, sectionsMap] of categoriesMap) {
    const sections: ArgumentSection[] = [];

    for (const [sectionName, items] of sectionsMap) {
      sections.push({
        section: sectionName,
        items,
      });
    }

    const dataSection: DataSection = {
      category,
      sections,
    };

    result.push(dataSection);
  }

  return result;
}

/**
 * Generates TypeScript file content for Arguments.ts
 */
function generateArgumentsFile(toolName: string, argumentsData: ArgumentsData): string {
  const varName =
    toolName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/gi, '') + 'Arguments';

  let content = `import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';\n\n`;
  content += `const ${varName}: ArgumentsData = ${JSON.stringify(argumentsData, null, 2)};\n\n`;
  content += `export default ${varName};\n`;

  return content;
}

/**
 * Processes a single tool configuration
 */
async function processTool(tool: ToolConfig): Promise<void> {
  console.log(`\n📥 Fetching ${tool.name} CLI arguments...`);

  try {
    // Fetch the Python file
    const pythonContent = await fetchUrl(tool.url);
    console.log(`✅ Downloaded ${pythonContent.length} bytes`);

    // Parse arguments
    const parsedArgs = parseArgumentsFromPython(pythonContent);
    console.log(`📋 Parsed ${parsedArgs.length} arguments`);

    // Convert to ArgumentsData structure
    const argumentsData = convertToArgumentsData(parsedArgs, tool.hasEnvVars);

    // Generate TypeScript file
    const tsContent = generateArgumentsFile(tool.name, argumentsData);

    // Write to file
    fs.writeFileSync(tool.outputPath, tsContent, 'utf-8');
    console.log(`💾 Saved to ${tool.outputPath}`);

    // Print summary
    console.log(`\n📊 Summary for ${tool.name}:`);
    for (const category of argumentsData) {
      if ('sections' in category) {
        console.log(`  - ${category.category}: ${category.sections.length} sections`);
        for (const section of category.sections) {
          console.log(`    - ${section.section}: ${section.items.length} items`);
        }
      } else {
        console.log(`  - ${category.category}: ${category.items.length} items`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${tool.name}:`, error);
    throw error;
  }
}

/**
 * Main function to fetch and update all tool arguments
 */
export async function fetchLatestCommands(): Promise<void> {
  console.log('🚀 Starting CLI arguments update...\n');
  console.log(`Processing ${TOOLS.length} tools:\n`);

  const results: {tool: string; success: boolean; error?: string}[] = [];

  for (const tool of TOOLS) {
    try {
      await processTool(tool);
      results.push({tool: tool.name, success: true});
    } catch (error) {
      results.push({
        tool: tool.name,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Print final summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 Final Results:');
  console.log('='.repeat(60));

  for (const result of results) {
    if (result.success) {
      console.log(`✅ ${result.tool}: Success`);
    } else {
      console.log(`❌ ${result.tool}: Failed - ${result.error}`);
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 ${successCount}/${results.length} tools updated successfully`);
}

// Run if executed directly
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  fetchLatestCommands()
    .then(() => {
      console.log('\n✨ All done!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Fatal error:', error);
      process.exit(1);
    });
}
