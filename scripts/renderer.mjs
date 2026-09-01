import { $n as TTS_ID, $t as claudeCodeArguments, A as SILLYTAVERN_RM, An as COMFYUI_ZLUDA_ID, B as LLAMA_CPP_UPDATE_TIME_KEY, Bn as LoLLMS_ID, Bt as hermesAgentArguments, Cn as ANTIGRAVITY_CLI_ID, Dn as CLAUDE_CODE_ID, E as TG_RM, En as CHAT_TTS_ID, Fn as KOHYA_ID, G as findCudartAssetUrlForPlatform, Gn as SD_FORGE_AMD_ID, Gt as openArguments, H as detectDefaultPlatformKey, Hn as ONETRAINER_ID, In as LANGFLOW_ID, It as langflowArguments, Jn as SD_UIUX_ID, Kn as SD_FORGE_ID, Kt as Flow_RM, L as LLAMA_CPP_INSTALL_DIR_KEY, Ln as LLAMA_CPP_ID, Lt as HermesAgent_RM, Mn as GeminiCli_ID, Mt as n8nArguments, N as sillyArguments, Nn as HERMES_AGENT_ID, Nt as Langflow_RM, On as COMFYUI_ID, Ot as gitmyloArguments, P as OPEN_WEBUI_RM, Pn as INVOKE_ID, Qn as TG_ID, R as LLAMA_CPP_INSTALL_TIME_KEY, Rn as LLAMA_FACTORY_ID, S as AITOOLKIT_RM, Sn as ALLTALK_ID, T as aiToolkitArguments, Tn as BOLT_DIY_ID, Tt as AG_RM, Un as OPEN_WEBUI_ID, V as LLAMA_PLATFORM_OPTIONS, Vn as N8N_ID, Vt as GeminiCli_RM, W as findAssetUrlForPlatform, Wn as SD_AMD_ID, Wt as geminiCliArguments, X as mcMonkeyArguments, Xn as SMARTGALLERY_ID, Xt as ClaudeCode_RM, Yn as SILLYTAVERN_ID, Yt as flowiseArguments, Z as SD_NEXT_RM, Zn as SWARM_ID, _ as bmaltaisArguments, _n as parseCustomArg, _t as fetchExtensionList, a as unslothStudioArguments, an as GitInstaller, at as INVOKE_RM, bn as AG_ID, bt as automatic1111Arguments, cn as isValidArg, dt as comfyuizludaArguments, en as AntigravityCli_RM, er as UNSLOTH_STUDIO_ID, et as vladmandicArguments, ft as comfyRocmArguments, gn as isWin, gt as comfyuiArguments, in as CardInfo, it as lshqqytigerArguments, jn as FLOWISEAI_ID, k as oobaboogaArguments, kn as COMFYUI_ROCM_ID, kt as N8N_RM, l as smartGalleryArguments, ln as cloneDeep, m as KOHYA_GUI_RM, n as UNSLOTH_STUDIO_RM, o as SMARTGALLERY_RM, on as catchAddress$3, p as llamaFactoryArguments, pn as getPythonCommandByOs, pt as COMFYUI_RM, q as SWARM_RM, qn as SD_NEXT_ID, rn as antigravityCliArguments, sn as getArgumentType, tr as VOICE_STUDIO_ID, tt as SD_AMD_RM, u as LLAMA_FACTORY_RM, un as DescriptionManager, v as LORA_MANAGER_RM, vt as parseArgsToString$3, wn as APPLIO_ID, wt as voiceStudioArguments, x as loraManagerArguments, xn as AITOOLKIT_ID, xt as VOICE_STUDIO_RM, yn as A1_ID, yt as parseStringToArgs$3, z as LLAMA_CPP_PLATFORM_KEY, zn as LORA_MANAGER_ID } from "./RendererMethods_BWB0EZ.mjs";
//#region module/src/containers/agent/index.ts
const agentsPage = {
	routePath: "agents_page",
	cards: [
		{
			id: FLOWISEAI_ID,
			title: "Flowise",
			description: "Drag & drop UI to build your customized LLM flow",
			repoUrl: "https://github.com/FlowiseAI/Flowise",
			type: "text",
			supportCustomArguments: true,
			methods: Flow_RM,
			arguments: flowiseArguments,
			installationType: "others"
		},
		{
			id: LANGFLOW_ID,
			title: "Langflow",
			description: "Visual framework for building and deploying AI-powered agents and workflows.",
			repoUrl: "https://github.com/langflow-ai/langflow",
			type: "text",
			supportCustomArguments: true,
			methods: Langflow_RM,
			arguments: langflowArguments,
			installationType: "others"
		},
		{
			id: GeminiCli_ID,
			title: "Gemini CLI",
			description: "An open-source AI agent that brings the power of Gemini directly into your terminal.",
			repoUrl: "https://github.com/google-gemini/gemini-cli",
			type: "text",
			arguments: geminiCliArguments,
			methods: GeminiCli_RM,
			installationType: "others"
		},
		{
			id: CLAUDE_CODE_ID,
			title: "Claude Code",
			description: `Anthropic's agentic coding tool for your terminal, integrated as an AI agent.`,
			repoUrl: "https://github.com/anthropics/claude-code",
			type: "text",
			arguments: claudeCodeArguments,
			methods: ClaudeCode_RM,
			installationType: "others"
		},
		{
			id: ANTIGRAVITY_CLI_ID,
			title: "Antigravity CLI",
			description: "Google terminal AI agent bringing multi-step reasoning, multi-file editing, and tool calling.",
			repoUrl: "https://github.com/google-antigravity/antigravity-cli",
			type: "text",
			arguments: antigravityCliArguments,
			methods: AntigravityCli_RM,
			installationType: "others"
		},
		{
			id: HERMES_AGENT_ID,
			title: "Hermes Agent",
			description: "Self-improving AI agent built by Nous Research with a built-in learning loop.",
			repoUrl: "https://github.com/nousresearch/hermes-agent",
			type: "text",
			supportCustomArguments: true,
			methods: HermesAgent_RM,
			arguments: hermesAgentArguments,
			installationType: "others"
		},
		{
			id: N8N_ID,
			title: "N8N",
			description: "Fair-code workflow automation platform with native AI capabilities and 400+ integrations.",
			repoUrl: "https://github.com/n8n-io/n8n",
			type: "text",
			supportCustomArguments: true,
			methods: N8N_RM,
			installationType: "others",
			arguments: n8nArguments
		}
	]
};
//#endregion
//#region module/src/containers/audio/AllTalkTts/RendererMethods.ts
const URL$5 = "https://github.com/erew123/alltalk_tts";
function startInstall$13(stepper) {
	stepper.initialSteps([
		"AllTalk TTS",
		"Clone",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(URL$5).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.runTerminalScript(dir, isWin ? "atsetup.bat" : "atsetup.sh").then(() => {
						stepper.setInstalled(dir);
						stepper.showFinalStep("success", "AllTalk TTS installation complete!", "All installation steps completed successfully. Your AllTalk TTS environment is now ready for use.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, URL$5).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "AllTalk TTS located successfully!", "Pre-installed AllTalk TTS detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, [isWin ? "start_alltalk.bat" : "start_alltalk.sh"]).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", "AllTalk TTS located successfully!", "Detected a manual installation of AllTalk TTS. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate AllTalk TTS!", "Please ensure you have selected the correct folder containing the AllTalk TTS repository.");
			});
		});
	});
}
function startUpdate$3(stepper, dir) {
	stepper.initialSteps([
		"Pull Changes",
		"Update",
		"Finish"
	]);
	if (dir) stepper.executeTerminalCommands("git pull", dir).then(() => {
		stepper.nextStep().then(() => {
			stepper.runTerminalScript(dir, isWin ? "atsetup.bat" : "atsetup.sh").then(() => {
				stepper.setUpdated();
				stepper.showFinalStep("success", "AllTalk TTS Updated Successfully!");
			});
		});
	});
	else stepper.showFinalStep("error", "Unable to update AllTalk TTS");
}
async function cardInfo$13(api, callback) {
	return CardInfo(URL$5, void 0, api, callback);
}
function catchAddress$2(input) {
	const match = input.match(/Gradio Dark.*?:\s*.*?(https?:\/\/.*?)(?=\s|\u001b|$)/i);
	if (match) return match[1];
}
const ALLTALK_RM = {
	cardInfo: cardInfo$13,
	catchAddress: catchAddress$2,
	manager: {
		startInstall: startInstall$13,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$3
		}
	}
};
//#endregion
//#region module/src/containers/audio/Applio/RendererMethods.ts
const URL$4 = "https://github.com/IAHispano/Applio";
function startInstall$12(stepper) {
	stepper.initialSteps([
		"Applio",
		"Clone",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(URL$4).then((dir) => {
				stepper.nextStep().then(() => {
					const installCmd = isWin ? ".\\run-install.bat" : "sh run-install.sh";
					stepper.executeTerminalCommands(installCmd, dir).then(() => {
						stepper.setInstalled(dir);
						stepper.showFinalStep("success", "Applio Installation Complete!", "Applio has been successfully installed. You can now start generating audio.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, URL$4).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "Applio Found!", "Existing Applio installation located.");
			} else stepper.utils.verifyFilesExist(targetDirectory, [isWin ? "run-applio.bat" : "run-applio.sh"]).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", "Applio located successfully!", "Detected a manual installation of Applio. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Invalid Applio Directory", "The selected directory does not appear to contain a valid Applio installation.");
			});
		});
	});
}
async function cardInfo$12(api, callback) {
	return CardInfo(URL$4, void 0, api, callback);
}
const APPLIO_RM = {
	catchAddress: catchAddress$3,
	cardInfo: cardInfo$12,
	manager: {
		startInstall: startInstall$12,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/audio/ChatTts/RendererMethods.ts
const CHAT_TTS_URL = "https://github.com/2noise/ChatTTS";
function startInstall$11(stepper) {
	const pipCommand = getPythonCommandByOs().pip;
	const installReqs = (dir) => {
		stepper.executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir).then(() => {
			stepper.nextStep().then(() => {
				stepper.setInstalled(dir);
				stepper.showFinalStep("success", "ChatTTS Installation Complete!", "ChatTTS has been successfully installed. You can now launch the WebUI to start generating speech.");
			});
		});
	};
	stepper.initialSteps([
		"ChatTTS",
		"Clone",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(CHAT_TTS_URL).then((dir) => {
				stepper.nextStep().then(() => {
					installReqs(dir);
				});
			});
		});
		else if (targetDirectory) stepper.utils.verifyFilesExist(targetDirectory, ["examples/web/webui.py", "requirements.txt"]).then((filesExist) => {
			if (filesExist) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "ChatTTS located successfully!", "Pre-installed ChatTTS detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.showFinalStep("error", "Unable to locate ChatTTS!", "Please ensure you have selected the correct folder containing the ChatTTS repository.");
		});
	});
}
async function cardInfo$11(api, callback) {
	return CardInfo(CHAT_TTS_URL, void 0, api, callback);
}
const CHAT_TTS_RM = {
	catchAddress: catchAddress$3,
	cardInfo: cardInfo$11,
	manager: {
		startInstall: startInstall$11,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/audio/TextToSpeech/RendererMethods.ts
const URL$3 = "https://github.com/rsxdalv/TTS-WebUI";
function catchAddress$1(input) {
	if (input.toLowerCase().includes("Installed Packages".toLowerCase())) return "http://127.0.0.1:7770";
	else return;
}
function startInstall$10(stepper) {
	GitInstaller("Text to Speech", URL$3, stepper, [isWin ? "start_tts_webui.bat" : "start_tts_webui.sh"]);
}
async function cardInfo$10(api, callback) {
	return CardInfo(URL$3, "/extensions", api, callback);
}
//#endregion
//#region module/src/containers/audio/index.ts
const audioPage = {
	routePath: "audioGen_page",
	cards: [
		{
			id: TTS_ID,
			title: "TTS WebUI",
			description: "A unified WebUI for speech synthesis, voice conversion, audio generation, and music models.",
			repoUrl: "https://github.com/rsxdalv/TTS-WebUI",
			type: "audio",
			extensionsDir: "/extensions",
			methods: {
				catchAddress: catchAddress$1,
				cardInfo: cardInfo$10,
				manager: {
					startInstall: startInstall$10,
					updater: { updateType: "git" }
				}
			},
			installationType: "git"
		},
		{
			id: AG_ID,
			title: "Audio Generation",
			description: "A webui for different audio related Neural Networks",
			repoUrl: "https://github.com/gitmylo/audio-webui",
			type: "audio",
			supportCustomArguments: true,
			arguments: gitmyloArguments,
			extensionsDir: "/extensions",
			methods: AG_RM,
			installationType: "git"
		},
		{
			id: ALLTALK_ID,
			title: "AllTalk TTS",
			description: "Advanced text-to-speech engine based on Coqui TTS with low VRAM support and voice cloning.",
			repoUrl: "https://github.com/erew123/alltalk_tts",
			type: "audio",
			methods: ALLTALK_RM,
			installationType: "git"
		},
		{
			id: APPLIO_ID,
			title: "Applio",
			description: "A simple, high-quality voice conversion tool focused on ease of use and performance.",
			repoUrl: "https://github.com/IAHispano/Applio",
			type: "audio",
			methods: APPLIO_RM,
			installationType: "git"
		},
		{
			id: CHAT_TTS_ID,
			title: "ChatTTS",
			description: "Generative speech model for daily dialogue scenarios supporting conversational TTS.",
			repoUrl: "https://github.com/2noise/ChatTTS",
			type: "audio",
			methods: CHAT_TTS_RM,
			installationType: "git"
		},
		{
			id: VOICE_STUDIO_ID,
			title: "VoiceStudio",
			description: "The open-source ElevenLabs alternative AI Voice Clone, Dub, Dictate, Transcribe, Audiobook creator and Voice workflow studio.",
			repoUrl: "https://github.com/debpalash/VoiceStudio",
			type: "audio",
			supportCustomArguments: true,
			arguments: voiceStudioArguments,
			methods: VOICE_STUDIO_RM,
			installationType: "git"
		}
	]
};
//#endregion
//#region module/src/containers/image/Automatic1111Sd/RendererMethods.ts
const A1_URL = "https://github.com/AUTOMATIC1111/stable-diffusion-webui";
function startInstall$9(stepper) {
	GitInstaller("Automatic1111", A1_URL, stepper, [isWin ? "webui-user.bat" : "webui.sh"]);
}
async function cardInfo$9(api, callback) {
	return CardInfo(A1_URL, "/extensions", api, callback);
}
const A1_RM = {
	catchAddress: catchAddress$3,
	fetchExtensionList,
	parseArgsToString: parseArgsToString$3,
	parseStringToArgs: parseStringToArgs$3,
	cardInfo: cardInfo$9,
	manager: {
		startInstall: startInstall$9,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/ComfyUiRocm/RendererMethods.ts
const URL$2 = "https://github.com/patientx-cfz/comfyui-rocm";
function parseArgsToString$2(args) {
	let result = "";
	let lines = "";
	let argResult = "";
	const envVars = {};
	args.forEach((arg) => {
		if (arg.custom) {
			const parsed = parseCustomArg(arg);
			if (!parsed) return;
			if (parsed.line) lines += parsed.line + "\n";
			if (parsed.commandArg) argResult += parsed.commandArg + " ";
		} else {
			if (arg.name === "PYTHON" || arg.name === "GIT" || arg.name === "VENV_DIR" || arg.name === "MIOPEN_FIND_MODE" || arg.name === "MIOPEN_LOG_LEVEL" || arg.name === "TRITON_OVERRIDE_ARCH" || arg.name === "COMFYUI_ENABLE_MIOPEN" || arg.name === "FLASH_ATTENTION_TRITON_AMD_ENABLE" || arg.name === "PYTORCH_TUNABLEOP_ENABLED" || arg.name === "PYTORCH_TUNABLEOP_VERBOSE" || arg.name === "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED") {
				envVars[arg.name] = arg.value;
				return;
			}
			const argType = getArgumentType(arg.name, comfyRocmArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (envVars.MIOPEN_FIND_MODE !== void 0) result += `set "MIOPEN_FIND_MODE=${envVars.MIOPEN_FIND_MODE}"\n`;
	if (envVars.MIOPEN_LOG_LEVEL !== void 0) result += `set "MIOPEN_LOG_LEVEL=${envVars.MIOPEN_LOG_LEVEL}"\n`;
	if (Object.keys(envVars).some((k) => k === "MIOPEN_FIND_MODE" || k === "MIOPEN_LOG_LEVEL")) result += "\n";
	if (envVars.PYTHON !== void 0) result += `set "PYTHON=${envVars.PYTHON}"\n`;
	if (envVars.GIT !== void 0) result += `set "GIT=${envVars.GIT}"\n`;
	if (envVars.VENV_DIR !== void 0) result += `set "VENV_DIR=${envVars.VENV_DIR}"\n`;
	if (Object.keys(envVars).some((k) => k === "PYTHON" || k === "GIT" || k === "VENV_DIR")) result += "\n";
	result += `set "COMMANDLINE_ARGS=${argResult.trim()}"\n\n`;
	if (envVars.TRITON_OVERRIDE_ARCH !== void 0) result += `set "TRITON_OVERRIDE_ARCH=${envVars.TRITON_OVERRIDE_ARCH}"\n\n`;
	if (lines) result += lines + "\n";
	return result;
}
function parseStringToArgs$2(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("set")) {
			const parts = line.split("=");
			if (parts.length >= 2) {
				const argName = parts[0].split(" ")[1]?.trim();
				const argValue = parts[1]?.trim();
				if (argName === "PYTHON" || argName === "GIT" || argName === "VENV_DIR" || argName === "MIOPEN_FIND_MODE" || argName === "MIOPEN_LOG_LEVEL" || argName === "TRITON_OVERRIDE_ARCH" || argName === "COMFYUI_ENABLE_MIOPEN" || argName === "FLASH_ATTENTION_TRITON_AMD_ENABLE" || argName === "PYTORCH_TUNABLEOP_ENABLED" || argName === "PYTORCH_TUNABLEOP_VERBOSE" || argName === "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED") argResult.push({
					name: argName,
					value: argValue
				});
			}
		} else if (line.includes("python.exe main.py")) {
			const clArgs = line.split("python.exe main.py ")[1];
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `--${id}`,
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, comfyRocmArguments)) {
					if (getArgumentType(value.name, comfyRocmArguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		}
	});
	return argResult;
}
const customArguments$1 = [
	{
		name: "PYTHON",
		value: "%~dp0python_env\\python.exe"
	},
	{
		name: "VENV_DIR",
		value: "./python_env"
	},
	{
		name: "--disable-auto-launch",
		value: ""
	},
	{
		name: "--use-quad-cross-attention",
		value: ""
	},
	{
		name: "--disable-triton-backend",
		value: ""
	},
	{
		name: "--enable-manager",
		value: ""
	},
	{
		name: "--enable-manager-legacy-ui",
		value: ""
	}
];
function startInstall$8(stepper) {
	stepper.initialSteps([
		"ComfyUI ROCm",
		"Clone",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(URL$2).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.runTerminalScript(dir, "install.bat").then(() => {
						stepper.setInstalled(dir);
						stepper.postInstall.config({ customArguments: {
							presetName: "ROCm Config",
							customArguments: customArguments$1
						} });
						stepper.showFinalStep("success", "ComfyUI-ROCm installation complete!", "All installation steps completed successfully. Your ComfyUI-ROCm environment is now ready for use.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, URL$2).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.postInstall.config({ customArguments: {
					presetName: "ROCm Config",
					customArguments: customArguments$1
				} });
				stepper.showFinalStep("success", "ComfyUI-ROCm located successfully!", "Pre-installed ComfyUI-ROCm detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["comfyui-rocm.bat", "comfyui-user.bat"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.postInstall.config({ customArguments: {
						presetName: "ROCm Config",
						customArguments: customArguments$1
					} });
					stepper.showFinalStep("success", "ComfyUI-ROCm located successfully!", "Pre-installed ComfyUI-ROCm detected. Installation skipped as your existing setup is ready to use. Note: Git repository not detected - updating may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate ComfyUI-ROCm!", "Please ensure you have selected the correct folder containing the ComfyUI-ROCm repository.");
			});
		});
	});
}
async function cardInfo$8(api, callback) {
	return CardInfo(URL$2, "/custom_nodes", api, callback);
}
const COMFYUI_ROCM_RM = {
	catchAddress: catchAddress$3,
	parseArgsToString: parseArgsToString$2,
	parseStringToArgs: parseStringToArgs$2,
	cardInfo: cardInfo$8,
	manager: {
		startInstall: startInstall$8,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/ComfyUiZluda/RendererMethods.ts
const URL$1 = "https://github.com/patientx/ComfyUI-Zluda";
function parseArgsToString$1(args) {
	let result = "";
	let lines = "";
	let argResult = "";
	const envVars = {};
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			if (arg.name === "PYTHON" || arg.name === "GIT" || arg.name === "VENV_DIR" || arg.name === "MIOPEN_FIND_MODE" || arg.name === "MIOPEN_LOG_LEVEL" || arg.name === "ZLUDA_COMGR_LOG_LEVEL" || arg.name === "TRITON_OVERRIDE_ARCH" || arg.name === "PYTORCH_TUNABLEOP_ENABLED" || arg.name === "PYTORCH_TUNABLEOP_VERBOSE" || arg.name === "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED") {
				envVars[arg.name] = arg.value;
				return;
			}
			const argType = getArgumentType(arg.name, comfyuizludaArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (envVars.MIOPEN_FIND_MODE !== void 0) result += `set "MIOPEN_FIND_MODE=${envVars.MIOPEN_FIND_MODE}"\n`;
	if (envVars.MIOPEN_LOG_LEVEL !== void 0) result += `set "MIOPEN_LOG_LEVEL=${envVars.MIOPEN_LOG_LEVEL}"\n`;
	if (Object.keys(envVars).some((k) => k === "MIOPEN_FIND_MODE" || k === "MIOPEN_LOG_LEVEL")) result += "\n";
	if (envVars.PYTHON !== void 0) result += `set "PYTHON=${envVars.PYTHON}"\n`;
	if (envVars.GIT !== void 0) result += `set "GIT=${envVars.GIT}"\n`;
	if (envVars.VENV_DIR !== void 0) result += `set "VENV_DIR=${envVars.VENV_DIR}"\n`;
	if (Object.keys(envVars).some((k) => k === "PYTHON" || k === "GIT" || k === "VENV_DIR")) result += "\n";
	result += `set "COMMANDLINE_ARGS=${argResult.trim()}"\n\n`;
	if (envVars.TRITON_OVERRIDE_ARCH !== void 0) result += `set "TRITON_OVERRIDE_ARCH=${envVars.TRITON_OVERRIDE_ARCH}"\n\n`;
	if (envVars.ZLUDA_COMGR_LOG_LEVEL !== void 0) result += `set "ZLUDA_COMGR_LOG_LEVEL=${envVars.ZLUDA_COMGR_LOG_LEVEL}"\n\n`;
	if (envVars.PYTORCH_TUNABLEOP_ENABLED !== void 0) result += `set "PYTORCH_TUNABLEOP_ENABLED=${envVars.PYTORCH_TUNABLEOP_ENABLED}"\n`;
	if (envVars.PYTORCH_TUNABLEOP_VERBOSE !== void 0) result += `set "PYTORCH_TUNABLEOP_VERBOSE=${envVars.PYTORCH_TUNABLEOP_VERBOSE}"\n`;
	if (envVars.PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED !== void 0) result += `set "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED=${envVars.PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED}"\n\n`;
	if (lines) result += lines + "\n";
	return result;
}
function parseStringToArgs$1(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("set")) {
			const argName = line.split("=")[0].split(" ")[1].trim();
			const argValue = line.split("=")[1].trim();
			if (argName === "PYTHON" || argName === "GIT" || argName === "VENV_DIR" || argName === "MIOPEN_FIND_MODE" || argName === "MIOPEN_LOG_LEVEL" || argName === "ZLUDA_COMGR_LOG_LEVEL" || argName === "TRITON_OVERRIDE_ARCH" || argName === "PYTORCH_TUNABLEOP_ENABLED" || argName === "PYTORCH_TUNABLEOP_VERBOSE" || argName === "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED") argResult.push({
				name: argName,
				value: argValue
			});
		} else if (line.includes("%PYTHON% main.py")) {
			const clArgs = line.split("%PYTHON% main.py ")[1];
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `--${id}`,
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, comfyuizludaArguments)) {
					if (getArgumentType(value.name, comfyuizludaArguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		}
	});
	return argResult;
}
const COMFYUI_ZLUDA_URL = "https://github.com/patientx/ComfyUI-Zluda";
const customArguments = [
	{
		name: "PYTHON",
		value: "%~dp0venv\\Scripts\\python.exe"
	},
	{
		name: "VENV_DIR",
		value: "./venv"
	},
	{
		name: "--disable-auto-launch",
		value: ""
	},
	{
		name: "--use-quad-cross-attention",
		value: ""
	},
	{
		name: "--reserve-vram",
		value: "0.9"
	},
	{
		name: "--disable-async-offload",
		value: ""
	},
	{
		name: "--disable-pinned-memory",
		value: ""
	}
];
function startInstall$7(stepper) {
	stepper.initialSteps([
		"ComfyUI Zluda",
		"Clone",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(COMFYUI_ZLUDA_URL).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.runTerminalScript(dir, "install-n.bat").then(() => {
						stepper.setInstalled(dir);
						stepper.postInstall.config({ customArguments: {
							presetName: "Zluda Config",
							customArguments
						} });
						stepper.showFinalStep("success", "ComfyUI-Zluda installation complete!", "All installation steps completed successfully. Your ComfyUI-Zluda environment is now ready for use.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, COMFYUI_ZLUDA_URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.postInstall.config({ customArguments: {
					presetName: "Zluda Config",
					customArguments
				} });
				stepper.showFinalStep("success", "ComfyUI-Zluda located successfully!", "Pre-installed ComfyUI-Zluda detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["comfyui-n.bat", "comfyui-user.bat"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.postInstall.config({ customArguments: {
						presetName: "Zluda Config",
						customArguments
					} });
					stepper.showFinalStep("success", "ComfyUI-Zluda located successfully!", "Pre-installed ComfyUI-Zluda detected. Installation skipped as your existing setup is ready to use. Note: Git repository not detected - updating may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate ComfyUI-Zluda!", "Please ensure you have selected the correct folder containing the ComfyUI-Zluda repository.");
			});
		});
	});
}
async function cardInfo$7(api, callback) {
	return CardInfo(URL$1, "/custom_nodes", api, callback);
}
const COMFYUI_ZLUDA_RM = {
	catchAddress: catchAddress$3,
	parseArgsToString: parseArgsToString$1,
	parseStringToArgs: parseStringToArgs$1,
	cardInfo: cardInfo$7,
	manager: {
		startInstall: startInstall$7,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/InvokeAi/Arguments.ts
const invokeArguments = [{
	category: "Command Line Arguments",
	sections: [
		{
			section: "Network & Server",
			items: [
				{
					name: "host",
					description: "IP address to bind to. Use 0.0.0.0 to serve to your local network.",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "port",
					description: "Port to bind to.",
					type: "Input",
					defaultValue: "9090"
				},
				{
					name: "allow_origins",
					description: "Allowed CORS origins.",
					type: "Input"
				},
				{
					name: "allow_credentials",
					description: "Allow CORS credentials.",
					type: "CheckBox"
				},
				{
					name: "allow_methods",
					description: "Methods allowed for CORS.",
					type: "Input",
					defaultValue: "['*']"
				},
				{
					name: "allow_headers",
					description: "Headers allowed for CORS.",
					type: "Input",
					defaultValue: "['*']"
				},
				{
					name: "ssl_certfile",
					description: "SSL certificate file for HTTPS. See https://www.uvicorn.org/settings/#https.",
					type: "File"
				},
				{
					name: "ssl_keyfile",
					description: "SSL key file for HTTPS. See https://www.uvicorn.org/settings/#https.",
					type: "File"
				},
				{
					name: "base_url",
					description: "Public base path when running behind a reverse proxy under a sub-path, e.g. /invoke.",
					type: "Input"
				},
				{
					name: "forwarded_allow_ips",
					description: "Comma-separated list of IPs (or *) allowed to set X-Forwarded-* headers.",
					type: "Input",
					defaultValue: "127.0.0.1"
				}
			]
		},
		{
			section: "Multiuser",
			items: [{
				name: "multiuser",
				description: "Enable multiuser support. Requires user authentication and authorization.",
				type: "CheckBox"
			}, {
				name: "strict_password_checking",
				description: "Enforce strict password requirements in multi-user mode.",
				type: "CheckBox"
			}]
		},
		{
			section: "Directories",
			items: [
				{
					name: "models_dir",
					description: "Path to the models directory.",
					type: "Directory",
					defaultValue: "models"
				},
				{
					name: "convert_cache_dir",
					description: "Path to the converted models cache directory (DEPRECATED, but do not delete because it is needed for migration from previous versions).",
					type: "Directory",
					defaultValue: "models/.convert_cache"
				},
				{
					name: "download_cache_dir",
					description: "Path to the directory that contains dynamically downloaded models.",
					type: "Directory",
					defaultValue: "models/.download_cache"
				},
				{
					name: "legacy_conf_dir",
					description: "Path to directory of legacy checkpoint config files.",
					type: "Directory",
					defaultValue: "configs"
				},
				{
					name: "db_dir",
					description: "Path to InvokeAI databases directory.",
					type: "Directory",
					defaultValue: "databases"
				},
				{
					name: "outputs_dir",
					description: "Path to directory for outputs.",
					type: "Directory",
					defaultValue: "outputs"
				},
				{
					name: "image_subfolder_strategy",
					description: "Strategy for organizing images into subfolders.",
					type: "DropDown",
					defaultValue: "flat",
					values: [
						"flat",
						"date",
						"type",
						"hash"
					]
				},
				{
					name: "custom_nodes_dir",
					description: "Path to directory for custom nodes.",
					type: "Directory",
					defaultValue: "nodes"
				},
				{
					name: "style_presets_dir",
					description: "Path to directory for style presets.",
					type: "Directory",
					defaultValue: "style_presets"
				},
				{
					name: "workflow_thumbnails_dir",
					description: "Path to directory for workflow thumbnails.",
					type: "Directory"
				}
			]
		},
		{
			section: "Logging",
			items: [
				{
					name: "log_tokenization",
					description: "Enable logging of parsed prompt tokens.",
					type: "CheckBox"
				},
				{
					name: "log_handlers",
					description: "Log handler. Valid options are \"console\", \"file=\", \"syslog=path|address:host:port\", \"http=\".",
					type: "Input",
					defaultValue: "['console']"
				},
				{
					name: "log_format",
					description: "Log format. Use \"plain\" for text-only, \"color\" for colorized output, \"legacy\" for 2.3-style logging and \"syslog\" for syslog-style.",
					type: "DropDown",
					defaultValue: "color",
					values: [
						"plain",
						"color",
						"syslog",
						"legacy"
					]
				},
				{
					name: "log_level",
					description: "Emit logging messages at this level or higher.",
					type: "DropDown",
					defaultValue: "info",
					values: [
						"debug",
						"info",
						"warning",
						"error",
						"critical"
					]
				},
				{
					name: "log_level_network",
					description: "Log level for network-related messages. 'info' and 'debug' are very verbose.",
					type: "DropDown",
					defaultValue: "warning",
					values: [
						"debug",
						"info",
						"warning",
						"error",
						"critical"
					]
				},
				{
					name: "log_sql",
					description: "Log SQL queries. log_level must be debug for this to do anything. Extremely verbose.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Development & Profiling",
			items: [
				{
					name: "use_memory_db",
					description: "Use in-memory database. Useful for development.",
					type: "CheckBox"
				},
				{
					name: "dev_reload",
					description: "Automatically reload when Python sources are changed. Does not reload node definitions.",
					type: "CheckBox"
				},
				{
					name: "profile_graphs",
					description: "Enable graph profiling using cProfile.",
					type: "CheckBox"
				},
				{
					name: "profile_prefix",
					description: "An optional prefix for profile output files.",
					type: "Input"
				},
				{
					name: "profiles_dir",
					description: "Path to profiles output directory.",
					type: "Directory",
					defaultValue: "profiles"
				}
			]
		},
		{
			section: "Memory & Performance",
			items: [
				{
					name: "max_cache_ram_gb",
					description: "The maximum amount of CPU RAM to use for model caching in GB. If unset, the limit will be configured based on the available RAM. It is recommended to leave this unset.",
					type: "Input"
				},
				{
					name: "max_cache_vram_gb",
					description: "The amount of VRAM to use for model caching in GB. If unset, the limit will be configured based on the available VRAM and device_working_mem_gb. It is recommended to leave this unset.",
					type: "Input"
				},
				{
					name: "device_working_mem_gb",
					description: "The amount of working memory to keep available on the compute device (in GB). Has no effect if running on CPU. If you are experiencing OOM errors, try increasing this value.",
					type: "Input"
				},
				{
					name: "log_memory_usage",
					description: "If True, a memory snapshot will be captured before and after every model cache operation, and the result will be logged (at debug level). There is a time cost to capturing the memory snapshots, so it is recommended to only enable this feature if you are actively inspecting the model cache's behaviour.",
					type: "CheckBox"
				},
				{
					name: "model_cache_keep_alive_min",
					description: "How long to keep models in cache after last use, in minutes. A value of 0 (the default) means models are kept in cache indefinitely. If no model generations occur within the timeout period, the model cache is cleared using the same logic as the \"Clear Model Cache\" button.",
					type: "Input",
					defaultValue: "0"
				},
				{
					name: "enable_partial_loading",
					description: "Enable partial loading of models. Reduces VRAM requirements (at the cost of slower speed) by streaming the model from RAM to VRAM as needed.",
					type: "CheckBox"
				},
				{
					name: "keep_ram_copy_of_weights",
					description: "Whether to keep a full RAM copy of a model's weights when loaded in VRAM. Increases RAM usage but speeds up model switching and LoRA patching.",
					type: "CheckBox"
				},
				{
					name: "pytorch_cuda_alloc_conf",
					description: "Configure the Torch CUDA memory allocator (e.g., \"backend:cudaMallocAsync\"). Impacts peak VRAM and performance. Requires experimentation.",
					type: "Input"
				},
				{
					name: "device",
					description: "Preferred execution device. auto will choose the device depending on the hardware platform, installed torch capabilities, and supports cuda:N device numbers.",
					type: "DropDown",
					defaultValue: "auto",
					values: [
						"auto",
						"cpu",
						"cuda",
						"mps",
						"cuda:N"
					]
				},
				{
					name: "precision",
					description: "Floating point precision. float16 will consume half the memory of float32 but produce slightly lower-quality images. The auto setting will guess the proper precision based on your video card and operating system.",
					type: "DropDown",
					defaultValue: "auto",
					values: [
						"auto",
						"float16",
						"bfloat16",
						"float32"
					]
				},
				{
					name: "sequential_guidance",
					description: "Whether to calculate guidance in serial instead of in parallel, lowering memory requirements.",
					type: "CheckBox"
				},
				{
					name: "attention_type",
					description: "Attention type.",
					type: "DropDown",
					defaultValue: "auto",
					values: [
						"auto",
						"normal",
						"xformers",
						"sliced",
						"torch-sdp"
					]
				},
				{
					name: "attention_slice_size",
					description: "Slice size, valid when attention_type==\"sliced\".",
					type: "DropDown",
					defaultValue: "auto",
					values: [
						"auto",
						"balanced",
						"max",
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8"
					]
				},
				{
					name: "force_tiled_decode",
					description: "Whether to enable tiled VAE decode (reduces memory consumption with some performance penalty).",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Features & Misc",
			items: [
				{
					name: "patchmatch",
					description: "Enable patchmatch inpaint code.",
					type: "CheckBox"
				},
				{
					name: "pil_compress_level",
					description: "The compress_level setting of PIL.Image.save(), used for PNG encoding. All settings are lossless. 0 = no compression, 1 = fastest (slightly larger file), 9 = slowest (smallest file). 1 is recommended.",
					type: "Input",
					defaultValue: "1"
				},
				{
					name: "max_queue_size",
					description: "Maximum number of items in the session queue.",
					type: "Input",
					defaultValue: "10000"
				},
				{
					name: "session_queue_mode",
					description: "Session queue mode. Use 'FIFO' or 'round_robin'.",
					type: "DropDown",
					defaultValue: "round_robin",
					values: ["FIFO", "round_robin"]
				},
				{
					name: "max_queue_history",
					description: "Keep the last N completed, failed, and canceled queue items on startup. 0 prunes all.",
					type: "Input"
				},
				{
					name: "clear_queue_on_startup",
					description: "Empties session queue on startup.",
					type: "CheckBox"
				},
				{
					name: "allow_nodes",
					description: "List of nodes to allow. Omit to allow all.",
					type: "Input"
				},
				{
					name: "deny_nodes",
					description: "List of nodes to deny. Omit to deny none.",
					type: "Input"
				},
				{
					name: "node_cache_size",
					description: "How many cached nodes to keep in memory.",
					type: "Input",
					defaultValue: "512"
				},
				{
					name: "hashing_algorithm",
					description: "Model hashing algorithm for model installs. 'blake3_multi' (SSD), 'blake3_single' (HDD). 'random' disables hashing (UUID). Other hashlib algos supported but slower.",
					type: "DropDown",
					defaultValue: "blake3_single",
					values: [
						"blake3_multi",
						"blake3_single",
						"random",
						"md5",
						"sha1",
						"sha224",
						"sha256",
						"sha384",
						"sha512",
						"blake2b",
						"blake2s",
						"sha3_224",
						"sha3_256",
						"sha3_384",
						"sha3_512",
						"shake_128",
						"shake_256"
					]
				},
				{
					name: "remote_api_tokens",
					description: "List of regex/token pairs for model downloads. If URL matches regex, token is used as Bearer token.",
					type: "Input"
				},
				{
					name: "scan_models_on_startup",
					description: "Scan models directory on startup to register orphaned models. Typically only used with use_memory_db for testing.",
					type: "CheckBox"
				},
				{
					name: "unsafe_disable_picklescan",
					description: "UNSAFE. Disable the picklescan security check during model installation. Recommended only for development and testing purposes.",
					type: "CheckBox"
				},
				{
					name: "allow_unknown_models",
					description: "Allow installation of models that cannot be identified. If enabled, models will be marked as unknown in the database with no metadata. If disabled, unknown models will be rejected during installation.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "External Providers",
			items: [
				{
					name: "external_gemini_api_key",
					description: "API key for Gemini image generation.",
					type: "Input"
				},
				{
					name: "external_gemini_base_url",
					description: "Base URL override for Gemini image generation.",
					type: "Input"
				},
				{
					name: "external_openai_api_key",
					description: "API key for OpenAI image generation.",
					type: "Input"
				},
				{
					name: "external_openai_base_url",
					description: "Base URL override for OpenAI image generation.",
					type: "Input"
				},
				{
					name: "external_alibabacloud_api_key",
					description: "API key for Alibaba Cloud DashScope image generation.",
					type: "Input"
				},
				{
					name: "external_alibabacloud_base_url",
					description: "Base URL override for Alibaba Cloud DashScope image generation.",
					type: "Input"
				},
				{
					name: "external_seedream_api_key",
					description: "API key for Seedream image generation.",
					type: "Input"
				},
				{
					name: "external_seedream_base_url",
					description: "Base URL override for Seedream image generation.",
					type: "Input"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/image/SdForge/RendererMethods.ts
const SD_FORGE_URL = "https://github.com/lllyasviel/stable-diffusion-webui-forge";
function startInstall$6(stepper) {
	GitInstaller("SD Forge", SD_FORGE_URL, stepper, [isWin ? "webui-user.bat" : "webui.sh"]);
}
async function cardInfo$6(api, callback) {
	return CardInfo(SD_FORGE_URL, "/extensions", api, callback);
}
const SD_FORGE_RM = {
	catchAddress: catchAddress$3,
	fetchExtensionList,
	parseArgsToString: parseArgsToString$3,
	parseStringToArgs: parseStringToArgs$3,
	cardInfo: cardInfo$6,
	manager: {
		startInstall: startInstall$6,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/SdForgeAmdgpu/Arguments.ts
const lshqqytigerForgeArguments = cloneDeep(automatic1111Arguments);
const newSection = {
	section: "AmdGPU",
	items: [
		{
			description: "Skip installation of onnxruntime; ONNX and Olive will be unavailable",
			name: "--skip-ort",
			type: "CheckBox"
		},
		{
			description: "use torch built with cpu",
			name: "--use-cpu-torch",
			type: "CheckBox"
		},
		{
			description: "use ZLUDA device as torch device",
			name: "--use-zluda",
			type: "CheckBox"
		},
		{
			description: "override torch version",
			name: "--override-torch",
			type: "Input"
		}
	]
};
const commandLineArgsIndex = lshqqytigerForgeArguments.findIndex((arg) => arg.category === "Command Line Arguments");
if (commandLineArgsIndex !== -1 && lshqqytigerForgeArguments[commandLineArgsIndex].sections) lshqqytigerForgeArguments[commandLineArgsIndex].sections.unshift(newSection);
//#endregion
//#region module/src/containers/image/SdForgeAmdgpu/RendererMethods.ts
const SdAMD_URL$1 = "https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu-forge";
function startInstall$5(stepper) {
	GitInstaller("SD Forge AMDGPU", SdAMD_URL$1, stepper, [isWin ? "webui-user.bat" : "webui.sh"]);
}
async function cardInfo$5(api, callback) {
	return CardInfo(SdAMD_URL$1, "RendererMethods", api, callback);
}
const SD_FORGE_AMD_RM = {
	catchAddress: catchAddress$3,
	fetchExtensionList,
	parseArgsToString: parseArgsToString$3,
	parseStringToArgs: parseStringToArgs$3,
	cardInfo: cardInfo$5,
	manager: {
		startInstall: startInstall$5,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/SdUiUx/RendererMethods.ts
const SdAMD_URL = "https://github.com/anapnoe/stable-diffusion-webui-ux";
function startInstall$4(stepper) {
	GitInstaller("SD UI-UX", SdAMD_URL, stepper, [isWin ? "webui-user.bat" : "webui.sh"]);
}
async function cardInfo$4(api, callback) {
	return CardInfo(SdAMD_URL, "/extensions", api, callback);
}
//#endregion
//#region module/src/containers/image/index.ts
const imagePage = {
	routePath: "imageGen_page",
	cards: [
		{
			id: COMFYUI_ID,
			title: "ComfyUI",
			description: "The most powerful and modular diffusion model GUI and backend with a node interface.",
			repoUrl: "https://github.com/Comfy-Org/ComfyUI",
			type: "image",
			supportCustomArguments: true,
			arguments: comfyuiArguments,
			methods: COMFYUI_RM,
			installationType: "git"
		},
		{
			id: SD_FORGE_ID,
			title: "SD Forge",
			description: "Platform built on Stable Diffusion WebUI optimizing resource management and speeding up inference.",
			repoUrl: "https://github.com/lllyasviel/stable-diffusion-webui-forge",
			type: "image",
			supportCustomArguments: true,
			arguments: automatic1111Arguments,
			methods: SD_FORGE_RM,
			installationType: "git"
		},
		{
			id: INVOKE_ID,
			title: "InvokeAI",
			description: "Leading creative engine empowering professionals and enthusiasts to generate visual media with AI.",
			repoUrl: "https://github.com/invoke-ai/InvokeAI",
			type: "image",
			methods: INVOKE_RM,
			arguments: invokeArguments,
			installationType: "others"
		},
		{
			id: SD_NEXT_ID,
			title: "SD Next",
			description: "Advanced Implementation of Stable Diffusion and other Diffusion-based generative image models",
			repoUrl: "https://github.com/vladmandic/sdnext",
			extensionsDir: "/extensions",
			type: "image",
			supportCustomArguments: true,
			arguments: vladmandicArguments,
			methods: SD_NEXT_RM,
			installationType: "git"
		},
		{
			id: A1_ID,
			title: "Stable Diffusion",
			description: "A web interface for Stable Diffusion, implemented using Gradio library.",
			repoUrl: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
			extensionsDir: "/extensions",
			type: "image",
			supportCustomArguments: true,
			arguments: automatic1111Arguments,
			methods: A1_RM,
			installationType: "git"
		},
		{
			id: COMFYUI_ZLUDA_ID,
			title: "ComfyUI Zluda",
			description: "Modular stable diffusion GUI with a graph interface, enhanced with ZLUDA for AMD GPUs.",
			repoUrl: "https://github.com/patientx/ComfyUI-Zluda",
			extensionsDir: "/custom_nodes",
			type: "image",
			supportCustomArguments: true,
			arguments: comfyuizludaArguments,
			methods: COMFYUI_ZLUDA_RM,
			installationType: "git"
		},
		{
			id: COMFYUI_ROCM_ID,
			title: "ComfyUI ROCm",
			description: "Modular stable diffusion GUI with a graph interface, enhanced with ROCm for AMD GPUs.",
			repoUrl: "https://github.com/patientx-cfz/comfyui-rocm",
			extensionsDir: "/custom_nodes",
			type: "image",
			supportCustomArguments: true,
			arguments: comfyRocmArguments,
			methods: COMFYUI_ROCM_RM,
			installationType: "git"
		},
		{
			id: SD_AMD_ID,
			title: "Stable Diffusion AMDGPU",
			description: "A web interface for Stable Diffusion, implemented using Gradio library.",
			repoUrl: "https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu",
			extensionsDir: "/extensions",
			type: "image",
			supportCustomArguments: true,
			arguments: lshqqytigerArguments,
			methods: SD_AMD_RM,
			installationType: "git"
		},
		{
			id: SD_FORGE_AMD_ID,
			title: "SD Forge AMDGPU",
			description: "Platform built on Stable Diffusion WebUI optimizing resource management and speeding up inference.",
			repoUrl: "https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu-forge",
			extensionsDir: "/extensions",
			type: "image",
			supportCustomArguments: true,
			arguments: lshqqytigerForgeArguments,
			methods: SD_FORGE_AMD_RM,
			installationType: "git"
		},
		{
			id: SWARM_ID,
			title: "SwarmUI",
			description: "Modular AI image generation WebUI emphasizing accessible powertools, high performance, and extensibility.",
			repoUrl: "https://github.com/mcmonkeyprojects/SwarmUI",
			type: "image",
			extensionsDir: "/src/Extensions",
			supportCustomArguments: true,
			arguments: mcMonkeyArguments,
			methods: SWARM_RM,
			installationType: "git"
		},
		{
			id: SD_UIUX_ID,
			title: "SD UI-UX",
			description: "A bespoke, highly adaptable, blazing fast user interface for Stable Diffusion.",
			repoUrl: "https://github.com/anapnoe/stable-diffusion-webui-ux",
			type: "image",
			extensionsDir: "/extensions",
			supportCustomArguments: true,
			arguments: automatic1111Arguments,
			methods: {
				catchAddress: catchAddress$3,
				fetchExtensionList,
				parseArgsToString: parseArgsToString$3,
				parseStringToArgs: parseStringToArgs$3,
				cardInfo: cardInfo$4,
				manager: {
					startInstall: startInstall$4,
					updater: { updateType: "git" }
				}
			},
			installationType: "git"
		}
	]
};
//#endregion
//#region module/src/containers/text/BoltDiy/RendererMethods.ts
const REPO_URL = "https://github.com/stackblitz-labs/bolt.diy";
const StarterSteps = [
	"Start",
	"Check NodeJS",
	"Bolt.Diy",
	"Packages",
	"Done!"
];
function startInstall$3(stepper) {
	const next = () => stepper.nextStep();
	const progress = (message) => stepper.progressBar(true, message);
	const checkNode = () => stepper.ipc.invoke("is_boltdiy_nodejs_installed");
	const installPackages = (dir) => stepper.ipc.invoke("is_boltdiy_npm_version_above_12").then((isAbove12) => {
		const flags = isAbove12 ? " --allow-remote=all --dangerously-allow-all-scripts" : "";
		return stepper.executeTerminalCommands(`npm i${flags}`, dir);
	});
	const installBolt = () => {
		stepper.cloneRepository(REPO_URL).then((dir) => {
			next().then(() => {
				installPackages(dir).then(() => {
					stepper.setInstalled(dir);
					stepper.showFinalStep("success", "Installation Complete!", "Your Bolt.Diy environment is ready. Enjoy!");
				});
			});
		});
	};
	stepper.initialSteps(StarterSteps);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") next().then(() => {
			progress("Checking for NodeJS availability...");
			checkNode().then((isNodeAvailable) => {
				if (isNodeAvailable) next().then(() => installBolt());
				else stepper.showFinalStep("error", "NodeJS is not installed!", "Please install NodeJS LTS and try again.");
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, REPO_URL).then((isValid) => {
			const title = "Bolt.Diy";
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", `${title} located successfully!`, `Pre-installed ${title} detected. Installation skipped as your existing setup is ready to use.`);
			} else stepper.utils.verifyFilesExist(targetDirectory, ["package.json"]).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `${title} located successfully!`, `Detected a manual installation of ${title}. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.`);
				} else stepper.showFinalStep("error", `Unable to locate ${title}!`, `Please ensure you have selected the correct folder containing the ${title} repository.`);
			});
		});
	});
}
async function cardInfo$3(api, callback) {
	return CardInfo(REPO_URL, void 0, api, callback);
}
function catchAddress(line) {
	const match = line.match(/https?:\/\/(?:localhost|\[?[\da-fA-F:]+]?)(?:\s*\x1b\[[0-9;]*m\s*)*(:?\s*(?:\x1b\[[0-9;]*m\s*)*\d+\s*(?:\x1b\[[0-9;]*m\s*)*)?\/?/);
	if (match) {
		let address = match[0];
		if (address.endsWith("/") && address.length > 8 && address !== "http://" && address !== "https://") address = address.slice(0, -1);
		address = address.replace(/\x1b\[[0-9;]*m/g, "");
		address = address.replace(/\s/g, "");
		return address;
	}
}
function startUpdate$2(stepper, dir) {
	stepper.initialSteps(["Updating", "Completed"]);
	stepper.executeTerminalCommands("git pull && npm i", dir).then(() => {
		stepper.setUpdated();
		stepper.showFinalStep("success", "Bolt.Diy Updated Successfully!", `Bolt.Diy has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
const BOLT_DIY_RM = {
	catchAddress,
	cardInfo: cardInfo$3,
	manager: {
		startInstall: startInstall$3,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$2
		}
	}
};
//#endregion
//#region module/src/containers/text/LlamaCpp/Arguments.ts
const llamaCppArguments = [{
	category: "Command Line Arguments",
	sections: [
		{
			section: "Server & Network Settings",
			items: [
				{
					name: "--host",
					description: "Hostname or IP address to listen on, or bind to UNIX socket (.sock). Default: 127.0.0.1.",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "--port",
					description: "Port to listen on. Default: 8080.",
					type: "Number",
					defaultValue: 8080,
					numberMin: 1,
					numberMax: 65535
				},
				{
					name: "--path",
					description: "Path for static web assets directory to serve custom web frontend UI.",
					type: "Directory"
				},
				{
					name: "--api-key",
					description: "API key required for authenticating client requests to HTTP server (comma-separated list).",
					type: "Input"
				},
				{
					name: "--cors-origins",
					description: "Comma-separated list of allowed origins for CORS. Default: *",
					type: "Input",
					defaultValue: "*"
				},
				{
					name: "--threads",
					description: "Number of CPU threads to use during generation processing (-t).",
					type: "Number",
					numberMin: 1,
					numberMax: 128
				},
				{
					name: "--threads-http",
					description: "Number of threads used to process HTTP requests.",
					type: "Number",
					defaultValue: -1
				},
				{
					name: "--timeout",
					description: "Server read/write timeout in seconds. Default: 3600.",
					type: "Number",
					defaultValue: 3600,
					numberMin: 1
				},
				{
					name: "--metrics",
					description: "Enable Prometheus compatible metrics endpoint /metrics.",
					type: "CheckBox"
				},
				{
					name: "--slots",
					description: "Expose slots monitoring endpoint.",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--slot-prompt-similarity",
					description: "How much the prompt of a request must match slot prompt to reuse slot. Default: 0.1.",
					type: "Number",
					defaultValue: .1,
					numberStep: .05,
					numberMin: 0,
					numberMax: 1
				},
				{
					name: "--sleep-idle-seconds",
					description: "Number of seconds of idleness after which the server will sleep (-1 to disable). Default: -1.",
					type: "Number",
					defaultValue: -1
				},
				{
					name: "--ui",
					description: "Whether to enable the Web UI frontend.",
					type: "CheckBox",
					defaultValue: true
				}
			]
		},
		{
			section: "Model & Loading Options",
			items: [
				{
					name: "--model",
					description: "Path to local GGUF model file (-m).",
					type: "File"
				},
				{
					name: "--model-url",
					description: "HTTP/HTTPS URL to download model file automatically (-mu).",
					type: "Input"
				},
				{
					name: "--hf-repo",
					description: "Hugging Face model repository (e.g. ggml-org/GLM-4.7-Flash-GGUF:Q4_K_M).",
					type: "Input"
				},
				{
					name: "--hf-file",
					description: "Hugging Face model file. If specified, overrides quant in --hf-repo.",
					type: "Input"
				},
				{
					name: "--hf-token",
					description: "Hugging Face access token for private or gated models.",
					type: "Input"
				},
				{
					name: "--load-mode",
					description: "Model loading mode: auto, none, mmap, mlock, mmap+mlock, dio (DirectIO).",
					type: "DropDown",
					values: [
						"auto",
						"none",
						"mmap",
						"mlock",
						"mmap+mlock",
						"dio"
					],
					defaultValue: "auto"
				},
				{
					name: "--ctx-size",
					description: "Size of the prompt context window (-c). Default: 0 (loaded from model).",
					type: "Number",
					defaultValue: 4096,
					numberMin: 0,
					numberMax: 1048576
				},
				{
					name: "--batch-size",
					description: "Logical maximum batch size (-b). Default: 2048.",
					type: "Number",
					defaultValue: 2048,
					numberMin: 1
				},
				{
					name: "--ubatch-size",
					description: "Physical maximum batch size (-ub). Default: 512.",
					type: "Number",
					defaultValue: 512,
					numberMin: 1
				},
				{
					name: "--parallel",
					description: "Number of server slots for parallel decoding (-np). Default: -1 (auto).",
					type: "Number",
					defaultValue: -1
				}
			]
		},
		{
			section: "Reasoning & Thinking Parameters",
			items: [
				{
					name: "--reasoning",
					description: "Enable reasoning/thinking in chat (-rea): on, off, auto (detect from template).",
					type: "DropDown",
					values: [
						"auto",
						"on",
						"off"
					],
					defaultValue: "auto"
				},
				{
					name: "--reasoning-effort",
					description: "Reasoning effort level given to the chat template.",
					type: "DropDown",
					values: [
						"default",
						"minimal",
						"low",
						"medium",
						"high",
						"xhigh",
						"max"
					],
					defaultValue: "default"
				},
				{
					name: "--reasoning-format",
					description: "Controls thought tag extraction format: auto, none, deepseek, deepseek-legacy.",
					type: "DropDown",
					values: [
						"auto",
						"none",
						"deepseek",
						"deepseek-legacy"
					],
					defaultValue: "auto"
				},
				{
					name: "--reasoning-budget",
					description: "Token budget for thinking: -1 for unrestricted, 0 for immediate end, N>0 for token budget.",
					type: "Number",
					defaultValue: -1
				},
				{
					name: "--reasoning-budget-message",
					description: "Message injected before end-of-thinking tag when reasoning budget is exhausted.",
					type: "Input"
				},
				{
					name: "--reasoning-preserve",
					description: "Preserve reasoning trace in full history, not just the last assistant message.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Hardware & Acceleration Offloading",
			items: [
				{
					name: "--n-gpu-layers",
					description: "Max number of layers to store in VRAM (-ngl). Number, auto, or all.",
					type: "Input",
					defaultValue: "auto"
				},
				{
					name: "--device",
					description: "Comma-separated list of devices to use for offloading (-dev, e.g. CUDA0, Vulkan0).",
					type: "Input"
				},
				{
					name: "--flash-attn",
					description: "Set Flash Attention use (-fa): auto, on, or off.",
					type: "DropDown",
					values: [
						"auto",
						"on",
						"off"
					],
					defaultValue: "auto"
				},
				{
					name: "--cont-batching",
					description: "Enable continuous dynamic batching (-cb).",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--cache-type-k",
					description: "KV cache data type for K (-ctk): f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1.",
					type: "DropDown",
					values: [
						"f16",
						"f32",
						"bf16",
						"q8_0",
						"q4_0",
						"q4_1",
						"iq4_nl",
						"q5_0",
						"q5_1"
					],
					defaultValue: "f16"
				},
				{
					name: "--cache-type-v",
					description: "KV cache data type for V (-ctv): f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1.",
					type: "DropDown",
					values: [
						"f16",
						"f32",
						"bf16",
						"q8_0",
						"q4_0",
						"q4_1",
						"iq4_nl",
						"q5_0",
						"q5_1"
					],
					defaultValue: "f16"
				},
				{
					name: "--split-mode",
					description: "How to split model across multiple GPUs (-sm): layer, row, tensor, none.",
					type: "DropDown",
					values: [
						"layer",
						"row",
						"tensor",
						"none"
					],
					defaultValue: "layer"
				},
				{
					name: "--main-gpu",
					description: "Main GPU index to use (-mg). Default: 0.",
					type: "Number",
					defaultValue: 0,
					numberMin: 0
				},
				{
					name: "--tensor-split",
					description: "Fraction of model offloaded to each GPU (-ts), e.g. 3,1 for 75%/25%.",
					type: "Input"
				},
				{
					name: "--cpu-moe",
					description: "Keep all Mixture of Experts (MoE) weights in CPU (-cmoe).",
					type: "CheckBox"
				},
				{
					name: "--n-cpu-moe",
					description: "Keep MoE weights of first N layers in CPU (-ncmoe).",
					type: "Number"
				},
				{
					name: "--numa",
					description: "NUMA optimization strategy: distribute, isolate, numactl.",
					type: "DropDown",
					values: [
						"distribute",
						"isolate",
						"numactl"
					]
				}
			]
		},
		{
			section: "Multimodal & Projector Options",
			items: [
				{
					name: "--mmproj",
					description: "Path to multimodal projector file (-mm).",
					type: "File"
				},
				{
					name: "--mmproj-url",
					description: "URL to download multimodal projector file (-mmu).",
					type: "Input"
				},
				{
					name: "--mmproj-auto",
					description: "Automatically use multimodal projector file if available.",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--mmproj-offload",
					description: "Enable GPU offloading for multimodal projector.",
					type: "CheckBox",
					defaultValue: true
				}
			]
		},
		{
			section: "Built-in Tools & Agent Capabilities",
			items: [
				{
					name: "--agent",
					description: "Enable CORS proxy and all built-in agent tools (-ag).",
					type: "CheckBox"
				},
				{
					name: "--tools",
					description: "Comma-separated list of built-in tools or \"all\" (e.g. read_file, exec_shell_command).",
					type: "Input"
				},
				{
					name: "--tools-runtime",
					description: "Separate runtime environment for tools: none, docker:, podman:, ssh:.",
					type: "Input"
				},
				{
					name: "--mcp-servers-config",
					description: "Path to JSON file with MCP server definitions (Cursor-compatible format).",
					type: "File"
				}
			]
		},
		{
			section: "Speculative Decoding",
			items: [
				{
					name: "--spec-type",
					description: "Types of speculative decoding: none, draft-simple, draft-eagle3, draft-mtp, ngram-simple.",
					type: "Input"
				},
				{
					name: "--model-draft",
					description: "Path to draft GGUF model file for speculative decoding (-md).",
					type: "File"
				},
				{
					name: "--n-gpu-layers-draft",
					description: "Max number of draft model layers to store in VRAM (-ngld).",
					type: "Input",
					defaultValue: "auto"
				},
				{
					name: "--spec-draft-n-max",
					description: "Number of tokens to draft for speculative decoding. Default: 3.",
					type: "Number",
					defaultValue: 3
				}
			]
		},
		{
			section: "Sampling & Generation Parameters",
			items: [
				{
					name: "--temp",
					description: "Temperature sampling value. Higher = creative, lower = deterministic. Default: 0.8.",
					type: "Number",
					defaultValue: .8,
					numberStep: .05,
					numberMin: 0,
					numberMax: 2
				},
				{
					name: "--top-p",
					description: "Top-P (nucleus) sampling threshold. Default: 0.95.",
					type: "Number",
					defaultValue: .95,
					numberStep: .05,
					numberMin: 0,
					numberMax: 1
				},
				{
					name: "--top-k",
					description: "Top-K sampling limit. Default: 40 (0 = disabled).",
					type: "Number",
					defaultValue: 40,
					numberMin: 0
				},
				{
					name: "--min-p",
					description: "Min-P sampling threshold. Default: 0.05 (0.0 = disabled).",
					type: "Number",
					defaultValue: .05,
					numberStep: .01,
					numberMin: 0,
					numberMax: 1
				},
				{
					name: "--repeat-penalty",
					description: "Penalize repeat sequence of tokens. Default: 1.0.",
					type: "Number",
					defaultValue: 1,
					numberStep: .05,
					numberMin: 1
				},
				{
					name: "--repeat-last-n",
					description: "Last N tokens to consider for penalizing repeat sequences. Default: 64.",
					type: "Number",
					defaultValue: 64
				},
				{
					name: "--presence-penalty",
					description: "Repeat alpha presence penalty.",
					type: "Number",
					defaultValue: 0,
					numberStep: .1
				},
				{
					name: "--frequency-penalty",
					description: "Repeat alpha frequency penalty.",
					type: "Number",
					defaultValue: 0,
					numberStep: .1
				},
				{
					name: "--dry-multiplier",
					description: "DRY sampling multiplier. Default: 0.0 (disabled).",
					type: "Number",
					defaultValue: 0,
					numberStep: .1
				},
				{
					name: "--dry-base",
					description: "DRY sampling base value. Default: 1.75.",
					type: "Number",
					defaultValue: 1.75,
					numberStep: .05
				},
				{
					name: "--dry-allowed-length",
					description: "Allowed length for DRY sampling. Default: 2.",
					type: "Number",
					defaultValue: 2
				},
				{
					name: "--dry-penalty-last-n",
					description: "DRY penalty for the last N tokens. Default: 64.",
					type: "Number",
					defaultValue: 64
				},
				{
					name: "--dynatemp-range",
					description: "Dynamic temperature range. Default: 0.0 (disabled).",
					type: "Number",
					defaultValue: 0,
					numberStep: .1
				},
				{
					name: "--dynatemp-exp",
					description: "Dynamic temperature exponent. Default: 1.0.",
					type: "Number",
					defaultValue: 1,
					numberStep: .1
				},
				{
					name: "--mirostat",
					description: "Use Mirostat sampling (0 = disabled, 1 = Mirostat 1.0, 2 = Mirostat 2.0).",
					type: "DropDown",
					values: [
						"0",
						"1",
						"2"
					],
					defaultValue: "0"
				}
			]
		},
		{
			section: "Prompt & Chat Templates",
			items: [
				{
					name: "--chat-template",
					description: "Pre-defined chat template or custom Jinja template string.",
					type: "Input"
				},
				{
					name: "--chat-template-file",
					description: "Path to text file containing custom Jinja chat template.",
					type: "File"
				},
				{
					name: "--jinja",
					description: "Enable Jinja template engine for chat parsing.",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--skip-chat-parsing",
					description: "Force pure content parser even if Jinja template is specified.",
					type: "CheckBox"
				},
				{
					name: "--prefill-assistant",
					description: "Prefill assistant response if last message is an assistant message.",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--system-prompt",
					description: "Default system prompt string.",
					type: "Input"
				},
				{
					name: "--prompt-file",
					description: "Path to text file containing prompt template.",
					type: "File"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/text/LlamaCpp/RendererMethods.ts
function getArgumentInfo(argName) {
	for (const data of llamaCppArguments) if ("sections" in data) {
		for (const section of data.sections) for (const item of section.items) if (item.name.split(" ")[0] === argName) return {
			category: data.category,
			type: item.type,
			name: item.name
		};
	}
}
function parseArgsToFiles(args) {
	let scriptString = "llama-server";
	args.forEach((arg) => {
		const info = getArgumentInfo(arg.name.split(" ")[0]) || getArgumentInfo(arg.name);
		const flagName = info ? info.name.split(" ")[0] : arg.name;
		if (info && info.type === "CheckBox") {
			if (arg.value !== "false" && arg.value !== false && arg.value !== 0 && String(arg.value) !== "0") scriptString += ` ${flagName}`;
		} else if (arg.value !== void 0 && arg.value !== null && String(arg.value).trim() !== "") scriptString += ` ${flagName} "${arg.value}"`;
	});
	scriptString += "\n";
	return { scriptData: scriptString };
}
function parseArgsToString(args) {
	const { scriptData } = parseArgsToFiles(args);
	return scriptData;
}
function parseStringToArgs(data) {
	const argResult = [];
	data.split("\n").forEach((line) => {
		const trimmed = line.trim();
		if (trimmed.startsWith("#") || !trimmed) return;
		if (trimmed.startsWith("llama-server") || trimmed.startsWith("llama-cli")) {
			const clArg = trimmed.replace(/^(llama-server|llama-cli)\s*/, "");
			const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
			const tokens = [];
			let tokenMatch;
			while ((tokenMatch = tokenRegex.exec(clArg)) !== null) tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
			for (let i = 0; i < tokens.length; i++) {
				const flag = tokens[i];
				if (!flag.startsWith("-")) continue;
				const info = getArgumentInfo(flag);
				const nameToUse = info ? info.name : flag;
				if (info ? info.type === "CheckBox" : false) argResult.push({
					name: nameToUse,
					value: "true"
				});
				else {
					const nextToken = tokens[i + 1];
					if (nextToken && !nextToken.startsWith("-")) {
						argResult.push({
							name: nameToUse,
							value: nextToken.replace(/"/g, "")
						});
						i++;
					} else argResult.push({
						name: nameToUse,
						value: "true"
					});
				}
			}
		}
	});
	return argResult;
}
function startInstall$2(stepper) {
	stepper.initialSteps([
		"llama.cpp",
		"Configure Options",
		"Download & Extract",
		"Finish"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Fetching recent llama.cpp releases from GitHub...");
			stepper.ipc.invoke("fetch_llama_cpp_releases").then((releases) => {
				const recentReleases = releases.slice(0, 15);
				if (!recentReleases.length) {
					stepper.showFinalStep("error", "Fetch Failed", "No llama.cpp releases found on GitHub.");
					return;
				}
				const versionOptions = recentReleases.map((r) => r.tag_name);
				const defaultVersion = versionOptions[0] || "latest";
				const platformLabels = LLAMA_PLATFORM_OPTIONS.map((opt) => opt.label);
				const defaultPlatformKey = detectDefaultPlatformKey();
				const defaultPlatformOption = LLAMA_PLATFORM_OPTIONS.find((opt) => opt.key === defaultPlatformKey) || LLAMA_PLATFORM_OPTIONS[0];
				const defaultPlatformLabel = defaultPlatformOption.label;
				const inputFields = [
					{
						id: "install_dir",
						label: "Installation Folder",
						type: "directory",
						isRequired: true
					},
					{
						id: "version",
						label: "Release Version",
						type: "select",
						selectOptions: versionOptions.length > 0 ? versionOptions : ["latest"],
						defaultValue: defaultVersion,
						isRequired: true
					},
					{
						id: "platform",
						label: "Architecture / Platform / Acceleration Backend",
						type: "select",
						selectOptions: platformLabels,
						defaultValue: defaultPlatformLabel,
						isRequired: true
					}
				];
				stepper.collectUserInput(inputFields, "llama.cpp Setup Options").then((results) => {
					const installDir = results.find((r) => r.id === "install_dir")?.result || "";
					const selectedVersionTag = results.find((r) => r.id === "version")?.result || defaultVersion;
					const selectedPlatformLabel = results.find((r) => r.id === "platform")?.result || defaultPlatformLabel;
					const selectedPlatformOption = LLAMA_PLATFORM_OPTIONS.find((opt) => opt.label === selectedPlatformLabel) || defaultPlatformOption;
					const chosenRelease = recentReleases.find((r) => r.tag_name === selectedVersionTag) || recentReleases[0];
					const assetUrl = chosenRelease ? findAssetUrlForPlatform(chosenRelease.assets, selectedPlatformOption.key) : void 0;
					const cudartAssetUrl = chosenRelease ? findCudartAssetUrlForPlatform(chosenRelease.assets, selectedPlatformOption.key) : void 0;
					if (!assetUrl) {
						stepper.showFinalStep("error", "Download Error", "Could not find a matching release binary asset for your selection.");
						return;
					}
					stepper.nextStep().then(() => {
						stepper.progressBar(true, `Downloading llama.cpp (${selectedVersionTag})...`);
						stepper.downloadFileFromUrl(assetUrl).then((downloadedFilePath) => {
							stepper.progressBar(true, "Decompressing archive with 7z...");
							stepper.utils.decompressFile(downloadedFilePath).then((extractedDir) => {
								stepper.progressBar(true, "Finalizing installation...");
								stepper.ipc.invoke("copy_llama_cpp_files", extractedDir, installDir).then(() => {
									const finalizeInstall = () => {
										stepper.setInstalled(installDir);
										const now = (/* @__PURE__ */ new Date()).toLocaleString();
										stepper.storage.set(LLAMA_CPP_INSTALL_TIME_KEY, now);
										stepper.storage.set(LLAMA_CPP_INSTALL_DIR_KEY, installDir);
										stepper.storage.set(LLAMA_CPP_PLATFORM_KEY, selectedPlatformOption.key);
										stepper.showFinalStep("success", "llama.cpp Ready!", `Installed llama.cpp version ${selectedVersionTag} successfully to ${installDir}.`);
									};
									if (cudartAssetUrl) {
										stepper.progressBar(true, "Downloading CUDA runtime components...");
										stepper.downloadFileFromUrl(cudartAssetUrl).then((cudartFile) => {
											stepper.progressBar(true, "Extracting CUDA runtime components...");
											stepper.utils.decompressFile(cudartFile).then((cudartExtracted) => {
												stepper.ipc.invoke("copy_llama_cpp_files", cudartExtracted, installDir).then(() => finalizeInstall()).catch(() => finalizeInstall());
											}).catch(() => finalizeInstall());
										}).catch(() => finalizeInstall());
									} else finalizeInstall();
								}).catch((err) => {
									stepper.showFinalStep("error", "Installation Failed", `Failed to copy llama.cpp files: ${err?.message || err}`);
								});
							}).catch((err) => {
								stepper.showFinalStep("error", "Extraction Failed", `Failed to decompress archive: ${err?.message || err}`);
							});
						}).catch((err) => {
							stepper.showFinalStep("error", "Download Failed", `Failed to download llama.cpp: ${err?.message || err}`);
						});
					});
				}).catch((err) => {
					stepper.showFinalStep("error", "Setup Error", `Error collecting user input: ${err?.message || err}`);
				});
			}).catch((err) => {
				stepper.showFinalStep("error", "Fetch Failed", `Failed to fetch llama.cpp releases: ${err?.message || err}`);
			});
		});
	}).catch((err) => {
		stepper.showFinalStep("error", "Starter Error", `Setup failed: ${err?.message || err}`);
	});
}
function startUpdate$1(stepper, dir) {
	if (!dir) return;
	stepper.initialSteps([
		"Checking Release",
		"Updating llama.cpp",
		"Done"
	]);
	stepper.storage.get(LLAMA_CPP_PLATFORM_KEY).then((platformKey) => {
		const activePlatformKey = platformKey || detectDefaultPlatformKey();
		stepper.ipc.invoke("fetch_llama_cpp_releases").then((releases) => {
			const latestRelease = releases[0];
			if (!latestRelease) {
				stepper.showFinalStep("error", "Update Failed", "Failed to fetch latest llama.cpp release metadata.");
				return;
			}
			const assetUrl = findAssetUrlForPlatform(latestRelease.assets, activePlatformKey);
			const cudartAssetUrl = findCudartAssetUrlForPlatform(latestRelease.assets, activePlatformKey);
			if (!assetUrl) {
				stepper.showFinalStep("error", "Update Failed", "Could not locate matching release asset for update.");
				return;
			}
			stepper.nextStep().then(() => {
				stepper.progressBar(true, `Downloading latest release (${latestRelease.tag_name})...`);
				stepper.downloadFileFromUrl(assetUrl).then((downloadedFilePath) => {
					stepper.progressBar(true, "Decompressing update package via 7z...");
					stepper.utils.decompressFile(downloadedFilePath).then((extractedDir) => {
						stepper.progressBar(true, "Replacing binary files...");
						stepper.ipc.invoke("copy_llama_cpp_files", extractedDir, dir).then(() => {
							const finalizeUpdate = () => {
								stepper.setUpdated();
								const now = (/* @__PURE__ */ new Date()).toLocaleString();
								stepper.storage.set(LLAMA_CPP_UPDATE_TIME_KEY, now);
								stepper.showFinalStep("success", "llama.cpp Updated!", `Successfully updated llama.cpp to version ${latestRelease.tag_name}.`);
							};
							if (cudartAssetUrl) {
								stepper.progressBar(true, "Updating CUDA runtime components...");
								stepper.downloadFileFromUrl(cudartAssetUrl).then((cudartFile) => {
									stepper.utils.decompressFile(cudartFile).then((cudartExtracted) => {
										stepper.ipc.invoke("copy_llama_cpp_files", cudartExtracted, dir).then(() => finalizeUpdate()).catch(() => finalizeUpdate());
									}).catch(() => finalizeUpdate());
								}).catch(() => finalizeUpdate());
							} else finalizeUpdate();
						}).catch((err) => {
							stepper.showFinalStep("error", "Update Failed", `Failed to copy update files: ${err?.message || err}`);
						});
					}).catch((err) => {
						stepper.showFinalStep("error", "Decompression Failed", `Failed to decompress update package: ${err?.message || err}`);
					});
				}).catch((err) => {
					stepper.showFinalStep("error", "Download Failed", `Failed to download update package: ${err?.message || err}`);
				});
			});
		}).catch((err) => {
			stepper.showFinalStep("error", "Update Failed", `Failed to fetch releases: ${err?.message || err}`);
		});
	}).catch((err) => {
		stepper.showFinalStep("error", "Storage Error", `Failed to retrieve platform configuration: ${err?.message || err}`);
	});
}
async function cardInfo$2(api, callback) {
	const dir = api.installationFolder;
	callback.setOpenFolders(dir ? [dir] : void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Platform / Backend",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(LLAMA_CPP_INSTALL_TIME_KEY).then((result) => {
		descManager.updateItem(0, 0, result || "Not Recorded");
	}).catch(() => {
		descManager.updateItem(0, 0, "Not Recorded");
	});
	api.storage.get(LLAMA_CPP_UPDATE_TIME_KEY).then((result) => {
		descManager.updateItem(0, 1, result || "Never Updated");
	}).catch(() => {
		descManager.updateItem(0, 1, "Never Updated");
	});
	api.ipc.invoke("current_llama_cpp_version", dir).then((result) => {
		descManager.updateItem(0, 2, result || "Unknown");
	}).catch(() => {
		descManager.updateItem(0, 2, "Unknown");
	});
	api.storage.get(LLAMA_CPP_PLATFORM_KEY).then((key) => {
		const opt = LLAMA_PLATFORM_OPTIONS.find((o) => o.key === key);
		descManager.updateItem(0, 3, opt ? opt.label : key || "Default");
	}).catch(() => {
		descManager.updateItem(0, 3, "Default");
	});
	api.ipc.invoke("fetch_llama_cpp_latest_tag").then((result) => {
		descManager.updateItem(0, 4, result || "Unknown");
	}).catch(() => {
		descManager.updateItem(0, 4, "Unknown");
	});
}
const LlamaCpp_RM = {
	catchAddress: catchAddress$3,
	cardInfo: cardInfo$2,
	parseArgsToString,
	parseStringToArgs,
	manager: {
		startInstall: startInstall$2,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$1
		}
	}
};
//#endregion
//#region module/src/containers/text/LoLLMs/RendererMethods.ts
const title = "LoLLMs";
const url = "https://github.com/ParisNeo/lollms-webui";
function startInstall$1(stepper) {
	stepper.initialSteps([
		title,
		"Clone",
		"Install",
		"Requirements",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(url).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.executeTerminalCommands("git submodule update --init --recursive", dir).then(() => {
						stepper.executeTerminalCommands([
							"pip install -r requirements.txt",
							"pip install -e .",
							`${dir}${isWin ? "\\" : "/"}lollms_core`
						]).then(() => {
							stepper.setInstalled(dir);
							stepper.showFinalStep("success", `${title} installation complete!`, `All installation steps completed successfully. Your ${title} environment is now ready for use.`);
						});
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, url).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", `${title} located successfully!`, `Pre-installed ${title} detected. Installation skipped as your existing setup is ready to use.`);
			} else stepper.utils.verifyFilesExist(targetDirectory, ["app.py"]).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `${title} located successfully!`, `Detected a manual installation of ${title}. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.`);
				} else stepper.showFinalStep("error", `Unable to locate ${title}!`, `Please ensure you have selected the correct folder containing the ${title} repository.`);
			});
		});
	});
}
async function cardInfo$1(api, callback) {
	return CardInfo(url, void 0, api, callback);
}
//#endregion
//#region module/src/containers/text/index.ts
const textPage = {
	routePath: "textGen_page",
	cards: [
		{
			id: TG_ID,
			title: "TextGen",
			description: "A Gradio web UI for Large Language Models.",
			repoUrl: "https://github.com/oobabooga/textgen",
			type: "text",
			extensionsDir: "/extensions",
			supportCustomArguments: true,
			arguments: oobaboogaArguments,
			methods: TG_RM,
			installationType: "git"
		},
		{
			id: LLAMA_CPP_ID,
			title: "llama.cpp",
			description: "LLM inference in C/C++",
			repoUrl: "https://github.com/ggml-org/llama.cpp",
			type: "text",
			installationType: "others",
			uninstallType: "removeFolder",
			supportCustomArguments: true,
			arguments: llamaCppArguments,
			methods: LlamaCpp_RM,
			developer: "ggml-org"
		},
		{
			id: OPEN_WEBUI_ID,
			title: "Open WebUI",
			description: "User-friendly, feature-rich self-hosted WebUI for LLMs supporting Ollama and OpenAI APIs.",
			repoUrl: "https://github.com/open-webui/open-webui",
			type: "text",
			methods: OPEN_WEBUI_RM,
			supportCustomArguments: true,
			installationType: "others",
			uninstallType: "others",
			arguments: openArguments
		},
		{
			id: BOLT_DIY_ID,
			title: "Bolt.Diy",
			description: "Prompt, run, edit, and deploy full-stack web applications using any LLM you want!",
			repoUrl: "https://github.com/stackblitz-labs/bolt.diy",
			type: "text",
			methods: BOLT_DIY_RM,
			installationType: "others",
			uninstallType: "removeFolder"
		},
		{
			id: SILLYTAVERN_ID,
			title: "SillyTavern",
			description: "LLM frontend for power users with unified API interface, extensions, and customizable UI.",
			repoUrl: "https://github.com/SillyTavern/SillyTavern",
			type: "text",
			supportCustomArguments: true,
			arguments: sillyArguments,
			methods: SILLYTAVERN_RM,
			installationType: "git"
		},
		{
			id: LoLLMS_ID,
			title: "LoLLMs",
			description: "Lord of Large Language and Multi modal Systems Web User Interface",
			repoUrl: "https://github.com/ParisNeo/lollms-webui",
			type: "text",
			methods: {
				catchAddress: catchAddress$3,
				cardInfo: cardInfo$1,
				manager: {
					startInstall: startInstall$1,
					updater: { updateType: "git" }
				}
			},
			installationType: "git"
		}
	]
};
//#endregion
//#region module/src/containers/tools/OneTrainer/RendererMethods.ts
const URL = "https://github.com/Nerogar/OneTrainer";
function startInstall(stepper) {
	stepper.initialSteps([
		"OneTrainer",
		"Clone",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(URL).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.runTerminalScript(dir, isWin ? "install.bat" : "install.sh").then(() => {
						stepper.setInstalled(dir);
						stepper.showFinalStep("success", "OneTrainer installation complete!", "All installation steps completed successfully. Your OneTrainer environment is now ready for use.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "OneTrainer located successfully!", "Pre-installed OneTrainer detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, [isWin ? "start-ui.bat" : "start-ui.sh"]).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `OneTrainer located successfully!`, "Detected a manual installation of OneTrainer. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate OneTrainer!", "Please ensure you have selected the correct folder containing the OneTrainer repository.");
			});
		});
	});
}
function startUpdate(stepper, dir) {
	stepper.initialSteps(["Update", "Finish"]);
	if (dir) stepper.runTerminalScript(dir, isWin ? "update.bat" : "update.sh").then(() => {
		stepper.setUpdated();
		stepper.showFinalStep("success", "OneTrainer Updated Successfully!");
	});
	else stepper.showFinalStep("error", "Unable to update OneTrainer");
}
async function cardInfo(api, callback) {
	return CardInfo(URL, void 0, api, callback);
}
//#endregion
//#region module/src/renderer.ts
const rendererModules = [
	imagePage,
	textPage,
	audioPage,
	{
		routePath: "tools_page",
		cards: [
			{
				id: ONETRAINER_ID,
				title: "OneTrainer",
				description: "OneTrainer is a one-stop solution for all your stable diffusion training needs.",
				repoUrl: "https://github.com/Nerogar/OneTrainer",
				type: "image",
				supportCustomArguments: true,
				methods: {
					cardInfo,
					manager: {
						startInstall,
						updater: {
							updateType: "stepper",
							startUpdate
						}
					}
				},
				installationType: "git"
			},
			{
				id: KOHYA_ID,
				title: "Kohya's GUI",
				description: "User-friendly Gradio GUI and CLI for training Stable Diffusion models and LoRAs.",
				repoUrl: "https://github.com/bmaltais/kohya_ss",
				type: "image",
				arguments: bmaltaisArguments,
				methods: KOHYA_GUI_RM,
				installationType: "git"
			},
			{
				id: AITOOLKIT_ID,
				title: "AI Toolkit",
				description: "The ultimate all-in-one training suite and GUI for fine-tuning diffusion models.",
				repoUrl: "https://github.com/ostris/ai-toolkit",
				type: "image",
				supportCustomArguments: true,
				arguments: aiToolkitArguments,
				methods: AITOOLKIT_RM,
				installationType: "git"
			},
			{
				id: SMARTGALLERY_ID,
				title: "SmartGallery",
				description: "A fast, offline-capable digital asset manager and gallery for ComfyUI outputs.",
				repoUrl: "https://github.com/biagiomaf/smart-comfyui-gallery",
				type: "image",
				arguments: smartGalleryArguments,
				supportCustomArguments: true,
				methods: SMARTGALLERY_RM,
				installationType: "git"
			},
			{
				id: LORA_MANAGER_ID,
				title: "ComfyUI LoRA Manager",
				description: "Comprehensive toolset for organizing, previewing, downloading, and applying LoRA models in ComfyUI.",
				repoUrl: "https://github.com/willmiao/ComfyUI-Lora-Manager",
				type: "image",
				supportCustomArguments: true,
				arguments: loraManagerArguments,
				methods: LORA_MANAGER_RM,
				installationType: "git"
			},
			{
				id: UNSLOTH_STUDIO_ID,
				title: "Unsloth Studio",
				description: "An open-source, no-code web UI for training and running LLMs locally.",
				repoUrl: "https://github.com/unslothai/unsloth",
				type: "text",
				supportCustomArguments: true,
				arguments: unslothStudioArguments,
				methods: UNSLOTH_STUDIO_RM,
				installationType: "others"
			},
			{
				id: LLAMA_FACTORY_ID,
				title: "LLaMA Factory",
				description: "Unified efficient fine-tuning of 100+ Large Language Models with CLI and Web UI.",
				repoUrl: "https://github.com/hiyouga/LlamaFactory",
				type: "text",
				supportCustomArguments: true,
				arguments: llamaFactoryArguments,
				methods: LLAMA_FACTORY_RM,
				installationType: "git"
			}
		]
	},
	agentsPage
];
//#endregion
export { rendererModules as default };
