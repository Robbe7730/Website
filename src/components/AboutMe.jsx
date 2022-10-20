import { FOAF, SCHEMA } from "../namespaces.js"
import { useState } from "react";

import { fetch as authFetch, getDefaultSession } from "@inrupt/solid-client-authn-browser";

import ContactItems from "./ContactItems.jsx"


export default function AboutMe(props) {
  const { user, graph } = props;

  const [imageUri, setImageUri] = useState(null);

  const image = graph.anyValue(user, FOAF("img")) || graph.anyValue(user, SCHEMA("image"));
  let name = (
    graph.anyValue(user, FOAF("name")) ||
    graph.anyValue(user, SCHEMA("name"))
  );

  if (image && !imageUri) {
    console.log(getDefaultSession().info.isLoggedIn);
    authFetch("https://solid.robbevanherck.be/robbevanherck/profile/card-private")
      .then((response) => response.text())
      .then(console.log);
    authFetch(image)
      .then(response => response.blob())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then(blob => URL.createObjectURL(blob))
      .then(setImageUri)
      .catch(err => {
        console.log(err);
        setImageUri(null);
      });
  }

  if (!name) {
    const firstName = (
      graph.anyValue(user, SCHEMA("givenName")) ||
        graph.anyValue(user, FOAF("firstName")) ||
        graph.anyValue(user, FOAF("givenName"))
    );
    const lastName = (
      graph.anyValue(user, SCHEMA("familyName")) ||
        graph.anyValue(user, FOAF("surname")) ||
        graph.anyValue(user, FOAF("family_name"))
    );

    if (firstName && lastName) {
      name = `${firstName} ${lastName}`;
    }
  }

  return (
    <header id="about-me">
      <img
        id="profile-picture"
        src={imageUri || "https://via.placeholder.com/150x150"}
        alt={name || "Profile picture"}
        property={image ? FOAF("img").value + " " + SCHEMA("image").value : undefined}
      />
      <div id="name-contact">
        <h1
          property={name ? FOAF("name") + " " + SCHEMA("name") : undefined}
          className={name ? undefined : 'loading'}
        >
          {name || "Loading..."}
        </h1>
        <ContactItems {...props} />
      </div>
    </header>
  );
}
