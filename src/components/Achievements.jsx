import { SCHEMA } from '../namespaces.js'

export default function Achievements(props) {
  const { graph, user } = props;

  const achievements = graph.each(user, SCHEMA("hasCredential")).map(uri => {
    return {
      title: graph.anyValue(uri, SCHEMA("name")),
      description: graph.anyValue(uri, SCHEMA("description")).trim(),
    }
  });

  return (
    <section id="achievements" className="half-block">
      <h2>Achievements</h2>
      {achievements.length === 0 && <span className="loading">Loading...</span>}
      {achievements.map((achievement, i) => (
        <div
          rel={SCHEMA("hasCredential").value}
          typeof={SCHEMA("EducationalOccupationalCredential").value}
          key={i}
        >
          <h3 property={SCHEMA('name').value}>{achievement.title}</h3>
          <p property={SCHEMA('description').value}>{achievement.description}</p>
        </div>
      ))}
    </section>
  );
}
