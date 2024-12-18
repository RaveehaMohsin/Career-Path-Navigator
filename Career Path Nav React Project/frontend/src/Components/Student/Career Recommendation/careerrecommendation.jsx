import React, { useEffect, useState } from "react";
import Upperheader from "../../UpperHeader/upperheader";
import "./careerrecommendation.css";
import Sitnspin from "../../Loading Spinners/SitnSpin/sitnspin";
import Swal from "sweetalert2";
import image from "../../../Assets/career.jpg";

export default function CareerRecommendation() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;
  const userId = currentuser.userId;
  const username = currentuser.firstName + " " + currentuser.lastName;

  const [interests, setInterests] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (North)",
    "Korea (South)",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [interest, setInterest] = useState("");
  const [education, setEducation] = useState("");
  const [country, setCountry] = useState("");

  const fetchInterests = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getinterest/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        const categories = data.map((item) => item.category); // Extract only categories
        setInterests(categories); // Set the extracted categories as the state
      } else {
        console.error("Error fetching interests:", data.message);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      setInterests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const handleGenerateResponses = async () => {
    if (!interest || !education || !country) {
      Swal.fire({
        icon: "warning",
        title: "Validation Warning",
        text: "Please fill all fields.",
      });
      return; 
    }
    setJobs([]);
    setDegrees([]);
    setCourses([]);
    setShowResults(false);
    setIsLoading(true);

    try {
      const prompt = `Provide 6 structured recommendations for jobs,6 structured recommendations for degrees, and 6 structured recommendations for courses based on the following inputs: Interest: ${interest},Education Level: ${education}, Country: ${country}. 
       Return a JSON object with the following attributes: 
       Jobs (Job Title, Company, Location, Brief Job Description, Salary Range, Employment Type, Education Level Required, Required Skills), 
       Degrees (Degree Title, Institution, Location, Duration, Mode of Study, Curriculum Overview, Career Opportunities, Salary Prospects),
       and Courses (Course Title, Provider, Duration, Brief Course Description, Course Level, Prerequisites, Skills Covered, Course Fees, Certification).`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const data = await response.json();

      // Log the raw response for debugging purposes
      console.log("Raw Response Data:", data);

      // Extract the text content from the response
      const textContent = data.candidates[0]?.content?.parts[0]?.text;

      if (!textContent) {
        throw new Error("No content received in response.");
      }

      // Clean up any unwanted characters around JSON data
      // Remove everything before and after the JSON string (if any)
      const jsonStringMatch = textContent.match(/({.*})/s); // Match everything within the JSON braces

      if (!jsonStringMatch) {
        throw new Error("No valid JSON found in the response.");
      }

      const jsonString = jsonStringMatch[0].trim();

      // Log cleaned-up JSON string for debugging
      console.log("Cleaned JSON String:", jsonString);

      try {
        // Try parsing the cleaned JSON string
        const parsedData = JSON.parse(jsonString);

        // Extract the Jobs, Degrees, and Courses arrays
        const jobs = parsedData.Jobs || [];
        const degrees = parsedData.Degrees || [];
        const courses = parsedData.Courses || [];

        // Log the extracted data for debugging
        console.log("Jobs:", jobs);
        console.log("Degrees:", degrees);
        console.log("Courses:", courses);

        // Update state with parsed data
        setJobs(jobs);
        setDegrees(degrees);
        setCourses(courses);

        setShowResults(true);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        throw new Error("Error parsing the response data into JSON.");
      }
    } catch (error) {
      console.error("Error in handleGenerateResponses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDegree = async (degree) => {
    const degreeData = {
      studentId: userId,
      degreeTitle: degree["Degree Title"],
      institution: degree.Institution,
      locationInstitute: degree.Location,
      duration: degree.Duration,
      modeOfStudy: Array.isArray(degree["Mode of Study"]) 
      ? degree["Mode of Study"].join(",") 
      : degree["Mode of Study"],
      curriculumOverview: Array.isArray(degree["Curriculum Overview"]) 
      ? degree["Curriculum Overview"].join(",") 
      : degree["Curriculum Overview"],
      careerOpportunities: Array.isArray(degree["Career Opportunities"]) 
      ? degree["Career Opportunities"].join(",") 
      : degree["Career Opportunities"],
      salaryProspects: degree["Salary Prospects"],
      status: "Wishlist",
    };

    try {
      const response = await fetch("https://marshy-brainy-weight.glitch.me/addDegree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(degreeData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            data.error || "An error occurred while adding the degree details.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  const handleAddJob = async (job) => {
    const jobData = {
      studentId: userId,
      jobTitle: job["Job Title"],
      company: job.Company,
      locationJob: job.Location,
      salaryRange: job["Salary Range"],
      employmentType: Array.isArray(job["Employment Type"]) 
        ? job["Employment Type"].join(",") 
        : job["Employment Type"],
      jobDescription: job["Brief Job Description"],
      educationLevelRequired: Array.isArray(job["Education Level Required"]) 
        ? job["Education Level Required"].join(",") 
        : job["Education Level Required"],
      requiredSkills: Array.isArray(job["Required Skills"]) 
        ? job["Required Skills"].join(",") 
        : job["Required Skills"],
      status: "Wishlist",
    };

    try {
      const response = await fetch("https://marshy-brainy-weight.glitch.me/addJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "An error occurred while adding the job details.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  const handleAddCourse = async (course) => {
    const courseData = {
      studentId: userId,
      courseTitle: course["Course Title"],
      providerSource: course.Provider,
      durationCourse: course.Duration,
      courseLevel: course["Course Level"],
      prerequisites: Array.isArray(course.Prerequisites) 
      ? course.Prerequisites.join(",") 
      : course.Prerequisites,
    skillsCovered: Array.isArray(course["Skills Covered"]) 
      ? course["Skills Covered"].join(",") 
      : course["Skills Covered"],
      courseFees: course["Course Fees"],
      certification: course.Certification,
      status: "Wishlist", // Default status or adjust as needed
    };

    try {
      const response = await fetch("https://marshy-brainy-weight.glitch.me/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            data.error || "An error occurred while adding the course details.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div>
      <Upperheader title="Career Recommendation" name={username} />

      <div className="career-recommendation-container">
        {/* Dropdown Selects */}
        <select
          className="select-option"
          value={interest} // Controlled by state
          onChange={(e) => setInterest(e.target.value)} // Update state on selection
          defaultValue=""
        >
          <option value="" disabled>
            Select Interest
          </option>
          {interests.length > 0 ? (
            interests.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No interests available
            </option>
          )}
        </select>

        <select
          className="select-option"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select Education
          </option>
          <option value="Matriculation">Matriculation</option>
          <option value="O Levels">O Levels</option>
          <option value="Intermediate">Intermediate</option>
          <option value="A Levels">A Levels</option>
          <option value="Associate Degree">Associate Degree</option>
          <option value="Bachelor's degree">Bachelor's degree</option>
          <option value="Master's degree">Master's degree</option>
          <option value="M.Phil">M.Phil</option>
          <option value="Ph.D.">Ph.D.</option>
        </select>

        <select
          className="select-option"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button className="generate-button" onClick={handleGenerateResponses}>
          Generate Responses
        </button>

        {/* Placeholder content before the spinner or results */}
        {!isLoading && !showResults && (
          <div className="placeholder-content">
            <h3>Get Personalized Career Recommendations!</h3>
            <p>
              Select your interests, education level, and country to receive
              job, degree, and course recommendations tailored just for you.
            </p>
            <img
              src={image}
              alt="Career Advice"
              className="placeholder-image"
            />
            <p className="instruction-text">
              Click the "Generate Responses" button to get started.
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="spinner">
            <Sitnspin />
          </div>
        )}

        {showResults && (
          <div className="results-tables table-responsive-xl">
            <table className="recommendation-table" style={{ width: "1250px" }}>
              <caption style={{ captionSide: "top" }}>
                Degree Recommendations
              </caption>
              <thead>
                <tr>
                  <th>Degree Title</th>
                  <th>Institution</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Mode of Study</th>
                  <th>Curriculum Overview</th>
                  <th>Career Opportunities</th>
                  <th>Salary Prospects</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {degrees.map((degree, index) => (
                  <tr key={index}>
                    <td>{degree["Degree Title"]}</td>
                    <td>{degree.Institution}</td>
                    <td>{degree.Location}</td>
                    <td>{degree.Duration}</td>
                    <td>{degree["Mode of Study"]}</td>
                    <td>{degree["Curriculum Overview"]}</td>
                    <td>{degree["Career Opportunities"]}</td>
                    <td>{degree["Salary Prospects"]}</td>
                    <td>
                      <button
                        className="add-button"
                        onClick={() => handleAddDegree(degree)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="recommendation-table" style={{ width: "1250px" }}>
              <caption style={{ captionSide: "top" }}>
                Job Recommendations
              </caption>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Salary Range</th>
                  <th>Employment Type</th>
                  <th>Job Description</th>
                  <th>Education Level Required</th>
                  <th>Required Skills</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>{job["Job Title"]}</td>
                    <td>{job.Company}</td>
                    <td>{job.Location}</td>
                    <td>{job["Salary Range"]}</td>
                    <td>{job["Employment Type"]}</td>
                    <td>{job["Brief Job Description"]}</td>
                    <td>{job["Education Level Required"]}</td>
                    <td>{job["Required Skills"]}</td>
                    <td>
                      <button
                        className="add-button"
                        onClick={() => handleAddJob(job)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="recommendation-table" style={{ width: "1250px" }}>
              <caption style={{ captionSide: "top" }}>
                Course Recommendations
              </caption>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Provider</th>
                  <th>Duration</th>
                  <th>Course Level</th>
                  <th>Prerequisites</th>
                  <th>Skills Covered</th>
                  <th>Course Fees</th>
                  <th>Certification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course["Course Title"]}</td>
                    <td>{course.Provider}</td>
                    <td>{course.Duration}</td>
                    <td>{course["Course Level"]}</td>
                    <td>{course.Prerequisites}</td>
                    <td>{course["Skills Covered"]}</td>
                    <td>{course["Course Fees"]}</td>
                    <td>{course.Certification}</td>
                    <td>
                      <button
                        className="add-button"
                        onClick={() => handleAddCourse(course)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
