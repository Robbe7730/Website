import { CV, CVB, FOAF, SCHEMA } from '../namespaces.js';

function displayDegreeType(predicate) {
  switch (predicate.value) {
    case CVB('EduHighSchool').value:
      return 'High School';
    case CVB('EduVocational').value:
      return 'Vocational';
    case CVB('EduCollegeCoursework').value:
      return 'College Coursework';
    case CVB('EduBachelor').value:
      return 'Bachelor';
    case CVB('EduMaster').value:
      return 'Master';
    case CVB('EduDoctorate').value:
      return 'Doctorate';
    case CVB('EduAssociate').value:
      return 'Associate';
    case CVB('EduProfessional').value:
      return 'Professional';
    default:
      return "Unknown education type";
  }
}

export default function Education(props) {
  const { graph, user } = props;

  const educations = [];
  graph.each(user, CV('hasEducation')).forEach(education => {
    const type = graph.any(education, CV('degreeType'));
    const institution = graph.any(education, CV('studiedIn'));
    const institutionName = institution ? graph.any(institution, FOAF('name')) || graph.any(institution, SCHEMA('name')) : null;
    const description = graph.any(education, CV('eduDescription'));
    const startDate = graph.any(education, CV('eduStartDate'));
    const endDate = graph.any(education, CV('eduGradDate'));

    educations.push(
      <li property={CV("hasEducation").value} typeof={CV("Education").value}>
        <span hidden property={CV('degreeType').value} href={type.value}>
          {displayDegreeType(type)}
        </span>
        <a
          className="education-school"
          property={CV('studiedIn').value}
          href={institution.value}
          typeof={CV('EducationalOrg').value}
        >
          <span
            about={institution.value}
            property={FOAF('name').value + ' ' + SCHEMA('name').value}
          >
            {institutionName.value}
          </span>
        </a>
        <span
          class="education-field"
          property={CV('eduDescription').value}
        >
          {description.value}
        </span>
        <span
          class="education-year"
          property={CV("eduStartDate").value}
        >
          {startDate.value}
        </span>
        {endDate && (
          <span
            hidden
            property={CV("eduGradDate").value}
          >
            {endDate.value}
          </span>
        )}
    </li>
    );
  });

  return (
    <section id="education" className="half-block">
      <h2>Education</h2>
      <ul id="education-timeline">
        <li>
          <span className="education-year">Now</span>
        </li>
        {educations}
      </ul>
    </section>
  )
}
