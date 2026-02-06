# Focus Timer

A modern, web-based focus timer designed to help you stay productive. Built with vanilla HTML, CSS, and JavaScript, featuring a sleek "glassmorphism" aesthetic.

## Features

- **Adjustable Timer**: Easily customize minutes and seconds using stepper controls (▲/▼).
- **Audio Alarm**: Plays a pleasant synthesized notification sound when the timer reaches zero.
- **Visual Feedback**: The interface blinks red to visually alert you when time is up.
- **Responsive Design**: Looks great on desktop and mobile devices.
- **Dark Mode**: Easy on the eyes with a deep blue/slate color palette.
- **No Dependencies**: Pure vanilla JavaScript - no external libraries or assets required.

## Getting Started

### Prerequisites

You only need a modern web browser (Chrome, generic Edge, Firefox, Safari) to run this application.

### Installation & Usage

1. **Clone the repository** (or download the files):
   ```bash
   git clone https://github.com/abeyjoe/timer_app.git
   ```
2. **Open the project**:
   Navigate to the project folder and open `index.html` in your web browser.

3. **Using the Timer**:
   - Use the **▲ / ▼** arrows next to the minutes and seconds to set your desired duration.
   - Click **Start** to begin the countdown.
   - Click **Pause** to temporarily stop the timer.
   - Click **Reset** to return to your originally set custom time.

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables), Flexbox, CSS Animations, and Backdrop Filter for the glass effect.
- **JavaScript (ES6+)**: Logic for the timer, DOM manipulation, and Web Audio API for sound generation.

## Project Structure

```
timer_app/
├── index.html      # Main application structure
├── style.css       # Styling and animations
└── script.js       # Timer logic and audio handling
```

## Customization

You can easily modify the default time or colors:
- **Default Time**: Edit `customMinutes` in `script.js`.
- **Colors**: Adjust the CSS variables in the `:root` section of `style.css`.

## License

This project is open source and available under the [MIT License](LICENSE).
