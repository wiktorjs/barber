<!-- Project Title -->
<h1 align="center" style="font-size: 40px; font-weight: 700; color: #08b998; text-shadow: 1px 1px 0 #000;">Y O B</h1>

<!-- Project Description -->
<p align="center">
  YOB is a fictional barber shop landing page built with pure HTML, CSS and Javascript. It's my first project made completely on my own. 
</p>

<h4 align='center' style='font-weight: 600;'>You can try the live demo of the app <a href='https://wiktorjs-yob.netlify.app'>here</a>.</h4>

<!-- Table of Contents -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)

<!-- Features -->

## Features
- Usage of Javascript classes.
- Adaptive navigation that adjusts based on viewport width and orientation. On larger screens, it utilizes Intersection Observer API to display itself after scrolling through the header.
- Conditional modal window for service booking or viewing available services.
- Leaflet API integration to display the barber shop location.
- Carousel showcasing three popular services, running only if it is within the range of view. It contains interactive controls, both for mobile and desktop devices.
- Lazy loading carousel images.
- All components are custom, created without external libraries (excluding Leaflet Map API).

<!-- Known Issues -->
<!-- ## Known Issues

-  -->

<!-- Installation -->

## Installation

1. Clone the repository:

```bash
git clone https://github.com/wiktorjs/barber.git
```

2. Navigate to the project directory:

```bash
cd barber
```

3. Install the dependencies:

```bash
npm i
```

4. Start development server:

```bash
npm start
```

5. Open http://localhost:3000 in your browser.
