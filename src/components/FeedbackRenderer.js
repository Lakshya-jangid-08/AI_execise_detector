class FeedbackRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.annotations = [];
    
    this.init();
  }

  init() {
    // Position camera
    this.camera.position.z = 5;
    
    // Setup renderer
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation loop
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  showFeedback(issues) {
    // Clear previous annotations
    this.clearAnnotations();
    
    // Add new annotations for each issue
    issues.forEach(issue => {
      const position = this.calculateScreenPosition(issue.joints[0]);
      const color = issue.severity === 'high' ? '#ff0000' : '#ffff00';
      this.addAnnotation(position, issue.message, color);
    });
  }

  addAnnotation(position, text, color) {
    // Create canvas for text
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.font = 'Bold 20px Arial';
    context.fillText(text, 10, 30);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    
    sprite.position.set(position.x, position.y, position.z);
    sprite.scale.set(0.5, 0.25, 1);
    this.scene.add(sprite);
    this.annotations.push(sprite);

    // Add arrow pointing to the joint
    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0), // Direction
      new THREE.Vector3(position.x, position.y, position.z), // Origin
      1, // Length
      color // Color
    );
    this.scene.add(arrow);
    this.annotations.push(arrow);
  }

  clearAnnotations() {
    this.annotations.forEach(annotation => {
      this.scene.remove(annotation);
    });
    this.annotations = [];
  }

  calculateScreenPosition(landmark) {
    // Convert pose landmark to screen position
    return {
      x: (landmark.x * 10) - 5,  // Adjust these multipliers based on your needs
      y: -(landmark.y * 10) + 5,
      z: 0
    };
  }
}