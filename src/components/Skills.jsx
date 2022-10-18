import { CV, RDF } from '../namespaces.js';

export default function Skills(props) {
  const { user, graph } = props;

  const skillUris = graph.each(user, CV('hasSkill'));
  const skillsByLevel = skillUris.reduce((acc, skillUri) => {
    const level = graph.any(skillUri, CV('skillLevel'));
    const skillName = graph.any(skillUri, CV('skillName')).value;

    const key = (graph.match(skillUri, RDF('type'), CV('LanguageSkill')).length === 0)
        ? "programmingLanguages"
        : "humanLanguages";
    if (!acc[key][level]) {
      acc[key][level] = [];
    }
    acc[key][level].push(skillName);
    return acc;
  }, {
    programmingLanguages:{},
    humanLanguages:{},
  });

  return (
    <section id="skills" class="half-block">
      <h2>Skills</h2>
      <h3>Programming Languages</h3>
      <ul>
        {Object.keys(skillsByLevel.programmingLanguages).length == 0 && (
          <li className="loading">Loading...</li>
        )}
        {Object.keys(skillsByLevel.programmingLanguages).map(level => (
          <li marker={level}>{skillsByLevel.programmingLanguages[level].join(", ")}</li>
        ))}
      </ul>
      <h3>Languages</h3>
      <ul>
        {Object.keys(skillsByLevel.humanLanguages).length == 0 && (
          <li className="loading">Loading...</li>
        )}
        {Object.keys(skillsByLevel.humanLanguages).map(level => (
          <li marker={skillsByLevel.humanLanguages[level].join(", ")}>{level}</li>
        ))}
      </ul>
    </section>
  )
}
