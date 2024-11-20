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