import { FOAF, SCHEMA } from "../namespaces.js"

import ContactItems from "./ContactItems.jsx"

export default function AboutMe(props) {
  const { createElement, createImage } = props;
  return (
    <header id="about-me">
      {createImage(
        [FOAF('img'), SCHEMA('image')],
        {
            "id": "profile-picture"
        },
        "https://via.placeholder.com/150x150"
      )}
      <div id="name-contact">
        {createElement(
          "h1",
          [FOAF('name'), SCHEMA("name")]
        )}
        <ContactItems {...props} />
      </div>
    </header>
  );
}
