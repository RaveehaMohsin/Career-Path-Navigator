CREATE TABLE Users (
    userId INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE Person (
    userId INT PRIMARY KEY,
    Gender VARCHAR(10) NOT NULL,
	PhoneNo VARCHAR(30) NOT NULL,
    CNIC VARCHAR(50) ,
    DOB DATE  NOT NULL,
    Address VARCHAR(255),
    City VARCHAR(50) NOT NULL,
    Country VARCHAR(50)  NOT NULL,
    Img VARCHAR (Max),
	FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Create the Interest table (Weak Entity)
CREATE TABLE Interest (
    interestId INT IDENTITY(1,1) PRIMARY KEY,
    studentId INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId)
);

-- Create the Background table (Weak Entity)
CREATE TABLE Background (
    backgroundId INT IDENTITY(1,1) PRIMARY KEY,
    studentId INT NOT NULL,
    instituteName VARCHAR(100) NOT NULL,
    degreeTitle VARCHAR(100) NOT NULL,
	degreeLevel  VARCHAR(100) NOT NULL,
    TotalMarks FlOAT NOT NULL,
    ObtainedMarks FLOAT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId)
);

-- Create the Degree table (Weak Entity)
CREATE TABLE Degree (
    degreeId INT IDENTITY(1,1) PRIMARY KEY,
    studentId INT NOT NULL,

	degreeTitle VARCHAR (Max) NOT NULL,
	instituition VARCHAR (Max) NOT NULL,
	locationInstitute VARCHAR (Max) NOT NULL,
	duration VARCHAR (Max) NOT NULL,
	modeofStudy VARCHAR (Max),
	curriculumOverview VARCHAR (Max) ,
	careerOpportunities VARCHAR (Max),
	salaryProspects VARCHAR (Max),

	status VARCHAR (Max) NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId)
);

-- Create the Course table (Weak Entity)
CREATE TABLE Course (
    courseId INT IDENTITY(1,1) PRIMARY KEY,
    studentId INT NOT NULL,

	courseTitle VARCHAR (Max) NOT NULL,
	providerSource VARCHAR (Max) NOT NULL,
	durationCourse VARCHAR (Max),
	courseLevel VARCHAR (Max) NOT NULL,
	prerequisites VARCHAR (Max),
	skillsCovered VARCHAR (Max) NOT NULL,
	courseFees VARCHAR (Max),
	certification VARCHAR (Max) NOT NULL,

	status VARCHAR (Max) NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId) 
);

-- Create the Jobs table (Weak Entity)
CREATE TABLE Jobs (
    jobId INT IDENTITY(1,1) PRIMARY KEY,
    studentId INT NOT NULL,

	jobTitle VARCHAR (Max) NOT NULL,
	company VARCHAR (Max) NOT NULL,
	locationJob VARCHAR (Max) NOT NULL,
	salaryrange VARCHAR (Max),
	employmentType VARCHAR (Max) NOT NULL,
	jobDescription VARCHAR (Max),
	educationLevelRequired VARCHAR (Max),
	requiredSkills VARCHAR (Max),

	status VARCHAR (Max) NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId)
);

CREATE TABLE Student (
    studentId INT PRIMARY KEY,
    resumeObjective TEXT,
    technicalSkills VARCHAR(Max),
    linkedInProfile VARCHAR(100),
	githubProfile VARCHAR(100),
	reference VARCHAR(Max),
    achievmentscertifications TEXT,
	projects TEXT,
    FOREIGN KEY (studentId) REFERENCES Users(userId) 
);

-- Create the Feedback table (Weak Entity)
CREATE TABLE Feedback (
    feedbackId INT PRIMARY KEY IDENTITY(1,1),  -- Auto increment feedbackId
    fromUserId INT NOT NULL,
    toUserId INT NOT NULL,
    rating INT,
    comments VARCHAR(MAX),  -- Changed from TEXT to VARCHAR(MAX) for better compatibility
    submissionDate DATETIME,  -- Changed to DATETIME for full date-time capture
    recommendtoothers BIT,  -- Using BIT for boolean representation
    experience VARCHAR(50),
    FOREIGN KEY (fromUserId) REFERENCES Users(userId),
    FOREIGN KEY (toUserId) REFERENCES Users(userId)
);

CREATE TABLE Counsellor (
    counsellorId INT PRIMARY KEY,
    expertise VARCHAR(100),
    noOfDaysAvailable INT,  
    availableDays VARCHAR(255),  
    timeSlots VARCHAR(255),  
    qualifications VARCHAR(255),  
    hourlyRate DECIMAL(10, 2), 
    FOREIGN KEY (counsellorId) REFERENCES Users(userId) 
);

-- Create the Invoice table (Strong Entity)
CREATE TABLE Invoice (
    invoiceId VARCHAR(255) PRIMARY KEY ,
    amount DECIMAL(10, 2),
    timeIssues DATE
);

-- Create the Meeting table (Weak Entity)
CREATE TABLE Meeting (
    meetingId INT PRIMARY KEY IDENTITY(1,1),
    invoiceId VARCHAR(255) NOT NULL,
    studentId INT NOT NULL,
    counsellorId INT NOT NULL,
    MeetingTime TIME,
    MeetingDate DATE,
    meetLink VARCHAR(255),
    FOREIGN KEY (invoiceId) REFERENCES Invoice(invoiceId),
    FOREIGN KEY (studentId) REFERENCES Users(userId),
    FOREIGN KEY (counsellorId) REFERENCES Counsellor(counsellorId)
);