export default class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private filters: Record<string, BiquadFilterNode> = {};
  private isRunning = false;

  async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      // Get user media
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100
        }
      });

      // Create audio context
      this.audioContext = new AudioContext();
      
      // Create source from microphone
      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.3; // Start at 30% volume for safety
      
      // Create equalizer filters
      this.createEqualizer();
      
      // Connect the audio graph
      this.connectAudioGraph();
      
      this.isRunning = true;
    } catch (error) {
      console.error('Error starting audio processor:', error);
      throw error;
    }
  }

  stop(): void {
    if (!this.isRunning) return;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.source = null;
    this.gainNode = null;
    this.filters = {};
    this.isRunning = false;
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      // Convert 0-100 range to 0-2 gain range with safety limit
      const gain = Math.min((volume / 100) * 2, 2);
      this.gainNode.gain.setValueAtTime(gain, this.audioContext!.currentTime);
    }
  }

  setEqualizer(settings: Record<string, number>): void {
    Object.entries(settings).forEach(([frequency, gain]) => {
      const filter = this.filters[frequency];
      if (filter) {
        filter.gain.setValueAtTime(gain, this.audioContext!.currentTime);
      }
    });
  }

  private createEqualizer(): void {
    if (!this.audioContext) return;

    const frequencies = [250, 500, 1000, 2000, 4000, 8000];
    
    frequencies.forEach(freq => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = freq;
      filter.Q.value = 1.0;
      filter.gain.value = 0;
      this.filters[freq.toString()] = filter;
    });
  }

  private connectAudioGraph(): void {
    if (!this.source || !this.gainNode || !this.audioContext) return;

    let currentNode: AudioNode = this.source;

    // Connect equalizer filters in series
    const frequencies = ['250', '500', '1000', '2000', '4000', '8000'];
    frequencies.forEach(freq => {
      const filter = this.filters[freq];
      if (filter) {
        currentNode.connect(filter);
        currentNode = filter;
      }
    });

    // Connect to gain node and then to destination
    currentNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }
}