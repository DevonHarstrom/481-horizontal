import RequirementsPage from "../../components/requirementspage";
const Minor = () => {
  const data = {
    credits_completed: 6,
    credits_remaining: 0,
    reqtitle: "Minor in Management",
    reqs: [
      {
        name: "Required Courses",
        credits: 6,
        outof: 6,
        completion: "complete",
        courses: [
          {
            course: "ENTI 201",
            sem: "Winter 2023",
            grade: "B",
            status: "complete",
            credits: 3,
            reqsSatisfied: true,
          },
          {
            course: "ACCT 301",
            sem: "Winter 2024",
            grade: "A",
            status: "complete",
            credits: 3,
            reqsSatisfied: true,
          },
        ],
      },
    ],
  };
  return (
    <>
      <RequirementsPage data={data} />
    </>
  );
};

export default Minor;
