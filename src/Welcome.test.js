import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer.js'
import Lesson from './Lesson.js'
import Welcome from './Welcome.js'

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Welcome> </Welcome>, div)
})