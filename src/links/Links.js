import "./links.css";

import gitHubImage from "./github.png";
import websiteImage from "./website-logo.svg";

function Links({ gitHubLink }) {
  const links = [
    ["Personal Website", "https://kr-matthews.github.io/", websiteImage],
    ["GitHub", gitHubLink, gitHubImage],
  ];

  return (
    <div className="link-footer">
      {links.map(([description, url, image]) => (
        <Link key={url} description={description} url={url} image={image} />
      ))}
    </div>
  );
}

// TODO: add hover text
function Link({ url, image, description }) {
  return (
    <a
      href={url}
      className="link-tooltip-container"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="link-image" src={image} alt="" />
      <span className="link-tooltip">{description}</span>
    </a>
  );
}

export default Links;
