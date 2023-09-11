import { useEffect } from "react";
import "./Footer.css";

export default function Footer() {
  useEffect(() => {
    let isFooterVisible = true;
    const threshold = 200; // Adjust this value to your desired scroll threshold

    // Function to handle the scroll event
    const handleScroll = () => {
      const footer = document.getElementById('footer-container'); // Change this to match your footer's ID
      const currentScrollY = window.scrollY;

      if (isFooterVisible && currentScrollY > threshold) {
          // Scroll below the threshold, hide the footer
          isFooterVisible = false;
          footer.style.opacity = '0';
      } else if (!isFooterVisible && currentScrollY <= threshold) {
          // Scroll back above the threshold, show the footer
          isFooterVisible = true;
          footer.style.opacity = '1';
      }
  };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    <footer id="footer-container">
      <ul id="footer-list">
        <div className="contributor-container">
          <span>James Askelson</span>
          <a
            href="https://jamesaskelson.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/james-askelson-bb4b6928a/"
            target="_blank"
            rel="noopener noreferer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </ul>
    </footer>
  );
}
