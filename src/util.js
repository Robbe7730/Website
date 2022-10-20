import { FOAF, SCHEMA } from "./namespaces.js";

export function findName(graph, uri) {
    let name = (
        graph.anyValue(uri, FOAF("name")) ||
        graph.anyValue(uri, SCHEMA("name"))
    );

    if (!name) {
        const firstName = (
            graph.anyValue(uri, SCHEMA("givenName")) ||
            graph.anyValue(uri, FOAF("firstName")) ||
            graph.anyValue(uri, FOAF("givenName"))
        );
        const lastName = (
            graph.anyValue(uri, SCHEMA("familyName")) ||
            graph.anyValue(uri, FOAF("surname")) ||
            graph.anyValue(uri, FOAF("family_name"))
        );

        if (firstName && lastName) {
            name = `${firstName} ${lastName}`;
        }
    }

    return name;
}
