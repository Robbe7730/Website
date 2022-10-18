import * as rdflib from 'rdflib';

export function comunicaObjectToRdflibObject(obj) {
  if (obj.termType === 'NamedNode') {
    return rdflib.sym(obj.value);
  } else if (obj.termType === 'Literal') {
    return rdflib.literal(obj.value, obj.language, obj.datatype);
  } else if (obj.termType === 'BlankNode') {
    return rdflib.blankNode(obj.value);
  } else {
    throw new Error('Unknown term type: ' + obj.termType);
  }
}

export function comunicaQuadToRdflibObject(quad) {
  const subject = comunicaObjectToRdflibObject(quad.subject);
  const predicate = comunicaObjectToRdflibObject(quad.predicate);
  const object = comunicaObjectToRdflibObject(quad.object);
  return rdflib.st(subject, predicate, object);
}
