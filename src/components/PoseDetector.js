class PoseDetector {
    constructor(feedbackRenderer) {
      this.feedbackRenderer = feedbackRenderer;
      this.currentExercise = null;
      this.videoElement = document.getElementsByClassName('input_video')[0];
      this.canvasElement = document.getElementsByClassName('output_canvas')[0];
      this.canvasCtx = this.canvasElement.getContext('2d');
      
      this.pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });
  
      this.pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
  
      this.pose.onResults(this.handlePoseResults.bind(this));
    }
  
    setCurrentExercise(exercise) {
      this.currentExercise = exercise;
    }
  
    startCamera() {
      this.camera = new Camera(this.videoElement, {
        onFrame: async () => {
          await this.pose.send({image: this.videoElement});
        },
        width: 1280,
        height: 720
      });
      this.camera.start();
    }
  
    handlePoseResults(results) {
      this.canvasCtx.save();
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.canvasCtx.drawImage(
        results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);
  
      if (results.poseLandmarks) {
        this.drawPoseLandmarks(results.poseLandmarks);
        this.evaluatePosture(results.poseLandmarks);
      }
  
      this.canvasCtx.restore();
    }
  
    drawPoseLandmarks(landmarks) {
      // Draw all landmarks in default color first
      drawConnectors(this.canvasCtx, landmarks, POSE_CONNECTIONS, 
        {color: '#FFFFFF', lineWidth: 2});
      drawLandmarks(this.canvasCtx, landmarks, {color: '#FFFFFF', radius: 2});
  
      // Apply custom coloring based on evaluation
      const issues = this.evaluatePosture(landmarks);
      issues.forEach(issue => {
        issue.joints.forEach(joint => {
          drawLandmarks(this.canvasCtx, [joint], { color: '#FF0000', radius: 4 }); // Red for incorrect
        });
      });
    }
  
    evaluatePosture(landmarks) {
      if (!this.currentExercise) return [];
  
      let issues = [];
      
      if (this.currentExercise === 'squats') {
        issues = checkSquatForm(landmarks);
      } else if (this.currentExercise === 'pushups') {
        issues = checkPushupForm(landmarks);
      }
  
      // Send issues to feedback renderer
      this.feedbackRenderer.showFeedback(issues);
      return issues;
    }
  }