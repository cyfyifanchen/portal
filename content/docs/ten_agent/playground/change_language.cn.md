---
title: 切换语言
---

当我们谈论智能体的语言时，我们指的是以下几个方面：

- 智能体理解用户音频输入的语言。即 STT 语言。
- 智能体回复用户的语言。即 TTS 语言。

您需要根据您的要求配置上述扩展的不同属性。

## 更改 STT + LLM + TTS 智能体的 STT 语言

要更改智能体理解用户音频输入的语言，您需要更改 STT 扩展的属性。您可以按照以下步骤操作：

1. 打开 [localhost:3000](http://localhost:3000) 上的 playground 以配置您的智能体。
2. 选择“voice_assistant”图表类型。
3. 单击图表选择右侧的按钮以打开属性配置。
4. 从下拉列表中选择“STT”扩展。
5. 将语言属性更改为所需的语言。
6. 单击“保存更改”以将语言应用于 STT 扩展。

> 注意：STT 扩展的语言属性根据 STT 服务提供商而异。有关支持的选项列表，请参阅 STT 服务提供商的文档。

## 更改 STT + LLM + TTS 智能体的 STT 语言（使用 RTC 集成的 Azure STT）

要更改智能体理解用户音频输入的语言，您需要更改 RTC 扩展的属性，因为 STT 扩展集成在其中。您可以按照以下步骤操作：

1. 打开 [localhost:3000](http://localhost:3000) 上的 playground 以配置您的智能体。
2. 选择“voice_assistant_stt_integrated”图表类型。
3. 单击图表选择右侧的按钮以打开属性配置。
4. 从下拉列表中选择“RTC”扩展。
5. 将语言属性更改为所需的语言。对于 Azure，“en-US”代表英语。您可以在 Azure 文档中找到更多语言选项。
6. 单击“保存更改”以将语言应用于 RTC 扩展。

## 更改智能体说话的语言

> 注意：TTS 支持的语言通常由 TTS 的声音决定。有些 TTS 支持多语言声音，而有些只支持一种语言。

要更改智能体回复用户的语言，您需要更改 TTS 扩展的属性。您可以按照以下步骤操作：

1. 打开 [localhost:3000](http://localhost:3000) 上的 playground 以配置您的智能体。
2. 选择“voice_assistant”图表类型。
3. 单击图表选择右侧的按钮以打开属性配置。
4. 从下拉列表中选择“TTS”扩展。
5. 将声音属性更改为所需语言的声音。
6. 单击“保存更改”以将语言应用于 TTS 扩展。

> 注意：TTS 扩展的声音属性根据 TTS 服务提供商而异。有关支持的选项列表，请参阅 TTS 服务提供商的文档。
