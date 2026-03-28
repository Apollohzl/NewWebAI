// 视频模型配置文件
// 用于快速配置和管理视频生成模型

export interface VideoModel {
  id: string;
  name: string;
  description: string;
  features: {
    supportsAudio: boolean;
    supportsReferenceImages: boolean;
    requiresReferenceImages: boolean;
    supportsDuration: boolean;
    supportedRatios: string[];
    maxDuration?: number;
    minDuration?: number;
  };
  advancedOptions?: {
    enableAudio?: {
      label: string;
      description: string;
    };
    referenceImages?: {
      firstFrameLabel: string;
      firstFrameDescription: string;
      lastFrameLabel: string;
      lastFrameDescription: string;
    };
    duration?: {
      label: string;
      description: string;
      options: Array<{ value: number; label: string }>;
    };
  };
}

export const videoModels: VideoModel[] = [
  {
    id: 'veo',
    name: 'Veo',
    description: 'Google Veo 视频生成模型，支持高质量视频生成',
    features: {
      supportsAudio: true,
      supportsReferenceImages: false,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      enableAudio: {
        label: '启用音频',
        description: '为视频生成音频'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'seedance',
    name: 'Seedance',
    description: 'Seedance 视频生成模型，支持图像参考生成',
    features: {
      supportsAudio: false,
      supportsReferenceImages: true,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      referenceImages: {
        firstFrameLabel: '第一帧参考图像 (可选)',
        firstFrameDescription: '输入图像URL作为第一帧参考',
        lastFrameLabel: '最后一帧参考图像 (可选)',
        lastFrameDescription: '输入图像URL作为最后一帧参考'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'seedance-pro',
    name: 'Seedance Pro',
    description: 'Seedance Pro 高级视频生成模型，提供更高质量的视频输出',
    features: {
      supportsAudio: false,
      supportsReferenceImages: true,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      referenceImages: {
        firstFrameLabel: '第一帧参考图像 (可选)',
        firstFrameDescription: '输入图像URL作为第一帧参考',
        lastFrameLabel: '最后一帧参考图像 (可选)',
        lastFrameDescription: '输入图像URL作为最后一帧参考'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'wan-fast',
    name: 'wan-fast',
    description: 'wan-fast 视频生成模型，支持音频生成',
    features: {
      supportsAudio: true,
      supportsReferenceImages: false,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      enableAudio: {
        label: '启用音频',
        description: '为视频生成音频'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'grok-video',
    name: 'Grok Video',
    description: 'Grok 视频生成模型，支持音频生成',
    features: {
      supportsAudio: true,
      supportsReferenceImages: false,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      enableAudio: {
        label: '启用音频',
        description: '为视频生成音频'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'ltx-2',
    name: 'ltx-2',
    description: 'ltx-2 视频生成模型，支持音频生成',
    features: {
      supportsAudio: true,
      supportsReferenceImages: false,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      enableAudio: {
        label: '启用音频',
        description: '为视频生成音频'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  },
  {
    id: 'nova-reel',
    name: 'nova-reel',
    description: 'nova-reel 视频生成模型，支持音频生成',
    features: {
      supportsAudio: true,
      supportsReferenceImages: false,
      requiresReferenceImages: false,
      supportsDuration: true,
      supportedRatios: ['16:9', '9:16'],
      maxDuration: 10,
      minDuration: 1
    },
    advancedOptions: {
      enableAudio: {
        label: '启用音频',
        description: '为视频生成音频'
      },
      duration: {
        label: '视频持续时间 (秒)',
        description: '选择视频的持续时间',
        options: [
          { value: 1, label: '1秒' },
          { value: 2, label: '2秒' },
          { value: 3, label: '3秒' },
          { value: 4, label: '4秒' },
          { value: 5, label: '5秒' },
          { value: 6, label: '6秒' },
          { value: 7, label: '7秒' },
          { value: 8, label: '8秒' },
          { value: 9, label: '9秒' },
          { value: 10, label: '10秒' }
        ]
      }
    }
  }

];

// 辅助函数：检查是否为视频模型
export function isVideoModel(modelId: string): boolean {
  return videoModels.some(model => model.id === modelId);
}

// 辅助函数：获取视频模型配置
export function getVideoModel(modelId: string): VideoModel | undefined {
  return videoModels.find(model => model.id === modelId);
}

// 辅助函数：获取所有视频模型ID
export function getVideoModelIds(): string[] {
  return videoModels.map(model => model.id);
}