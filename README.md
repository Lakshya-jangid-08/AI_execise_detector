# AI Exercise Coach

The **AI Exercise Coach** is a web-based application that provides real-time feedback on your posture while performing exercises like squats and push-ups. It uses MediaPipe for pose detection and Three.js for 3D annotations to highlight areas of improvement.

## Features

- **Real-Time Pose Detection**: Uses MediaPipe to detect body landmarks.
- **Exercise-Specific Feedback**: Provides tailored feedback for squats and push-ups.
- **3D Annotations**: Highlights incorrect posture using Three.js.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **HTML/CSS/JavaScript**: Core web technologies.
- **MediaPipe**: For pose detection and landmark tracking.
- **Three.js**: For rendering 3D annotations.
- **Camera API**: For accessing the user's webcam.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-portfolio/Pro
   ```

2. Open the `home.html` file in your browser to launch the application.

3. Ensure you have a webcam enabled for real-time feedback.

## Usage

1. Open the application in your browser.
2. Select an exercise by clicking on the **Start Squats** or **Start Push-Ups** button.
3. Perform the exercise in front of your webcam.
4. Receive real-time feedback on your posture with visual annotations.

## File Structure

- **style.css**: Contains the styles for the application.
- **main.js**: Initializes the application and handles user interactions.
- **src/components/**: Contains modular JavaScript files for core functionalities:
  - `PoseDetector.js`: Handles pose detection and posture evaluation.
  - `FeedbackRenderer.js`: Renders 3D annotations for feedback.
  - `exerciseRules.js`: Contains rules for evaluating squats and push-ups.
- **home.html**: The main HTML file for the application.

## Future Enhancements

- Add support for more exercises.
- Improve feedback accuracy with advanced pose analysis.
- Add audio feedback for better user experience.


## Acknowledgments

- [MediaPipe](https://mediapipe.dev/) for pose detection.
- [Three.js](https://threejs.org/) for 3D rendering.
