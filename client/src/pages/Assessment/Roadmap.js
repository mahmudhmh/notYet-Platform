import React, { useEffect, useState } from "react";
import "./Roadmap.css"; // Import the CSS file
import LogoWhiteText from "../../assets/LogoWhiteText.png";
import { Link } from "react-router-dom";
const Roadmap = () => {
  const [assessmentResult, setAssessmentResult] = useState("");

  useEffect(() => {
    // Check assessmentResult value from localStorage
    const storedAssessmentResult = localStorage.getItem("assessmentResult");
    if (storedAssessmentResult) {
      setAssessmentResult(storedAssessmentResult);
    }
  }, []);

  let selectedRoadmap = null;

  if (assessmentResult === "Beginner") {
    selectedRoadmap = (
      <div className="container-rm">
        <h2>Beginner Roadmap</h2>
        <div className="carddd">
          <h1>Programming Fundamentals</h1>
          <p>
            Understand programming concepts like variables, data types, control
            structures (loops, conditionals), functions, and basic algorithms.
            Start with a beginner-friendly programming language like Python.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Data Structures</h1>
          <p>
            Learn about different data structures such as arrays, linked lists,
            stacks, queues, trees, graphs, and hash tables. Understand their
            properties, operations, and time complexities.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Algorithms</h1>
          <p>
            Study common algorithms like sorting, searching, graph traversal,
            and dynamic programming. Analyze their time and space complexities
            to understand their efficiency.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Object-Oriented Programming (OOP)</h1>
          <p>
            Familiarize yourself with OOP principles, including encapsulation,
            inheritance, polymorphism, and abstraction. Learn to design and
            implement classes and objects.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Databases</h1>
          <p>
            Gain knowledge of database concepts, relational databases, SQL
            (Structured Query Language), and basic database management systems.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Web Development</h1>
          <p>
            Explore web technologies such as HTML, CSS, and JavaScript.
            Understand how web applications work, including client-server
            architecture and HTTP protocols.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Operating Systems</h1>
          <p>
            Learn about operating system principles, processes, threads, memory
            management, file systems, and synchronization mechanisms.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Networking</h1>
          <p>
            Understand the basics of computer networks, including TCP/IP,
            network protocols, IP addressing, and routing.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Discrete Mathematics</h1>
          <p>
            Develop a foundation in discrete mathematics, including logic, sets,
            relations, functions, combinatorics, and graph theory. These
            concepts form the basis of many computer science applications.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Problem-Solving Paradigms</h1>
          <p>
            Explore different problem-solving paradigms like recursion, divide
            and conquer, greedy algorithms, and dynamic programming. Understand
            when to apply each paradigm to solve specific types of problems.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Software Engineering Principles</h1>
          <p>
            Learn about software development methodologies, version control
            systems (e.g., Git), software testing, and debugging techniques.
            Understand the importance of code documentation and maintainability.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Artificial Intelligence and Machine Learning</h1>
          <p>
            Gain an understanding of basic AI and ML concepts, including machine
            learning algorithms, neural networks, data preprocessing, and model
            evaluation.
            <br />
            <br />
          </p>
        </div>
      </div>
    );
  } else if (assessmentResult === "Intermediate") {
    selectedRoadmap = (
      <div className="container-rm">
        <h2>Intermediate Roadmap</h2>

        <div className="carddd">
          <h1>Advanced Data Structures</h1>
          <p>
            Dive deeper into data structures like AVL trees, B-trees, heaps,
            tries, and advanced graph algorithms (e.g., Dijkstra's algorithm,
            Bellman-Ford algorithm).
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Design Patterns</h1>
          <p>
            Study common design patterns such as Singleton, Factory, Observer,
            Strategy, and MVC (Model-View-Controller). Understand how to apply
            these patterns to solve design problems and improve code modularity.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Algorithmic Analysis</h1>
          <p>
            Deepen your understanding of algorithmic analysis by studying more
            advanced topics like algorithmic complexity (Big O notation, time
            and space complexity analysis), NP-completeness, and approximation
            algorithms.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Operating Systems Internals</h1>
          <p>
            Explore the internal workings of operating systems, including
            process scheduling, memory management algorithms (paging,
            segmentation), file system internals, and device management.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Computer Architecture</h1>
          <p>
            Learn about computer organization and architecture, including CPU
            design, memory hierarchy, instruction sets, pipelining, caching, and
            parallel computing.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Networks and Protocols</h1>
          <p>
            Dive deeper into networking concepts, including network security,
            routing algorithms, transport layer protocols (TCP, UDP), network
            congestion control, and network performance optimization.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Database Management Systems</h1>
          <p>
            Expand your knowledge of databases by studying advanced topics such
            as database normalization, query optimization, transaction
            management, and distributed databases.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Software Testing and Quality Assurance</h1>
          <p>
            Explore software testing techniques, test-driven development, code
            coverage analysis, and automated testing frameworks. Learn how to
            write effective test cases and perform software quality assurance.
            <br />
            <br />
          </p>
        </div>
      </div>
    );
  } else if (assessmentResult === "Advanced") {
    selectedRoadmap = (
      <div className="container-rm">
        <h2>Advanced Roadmap</h2>

        <div className="carddd">
          <h1>Advanced Algorithms</h1>
          <p>
            Study advanced algorithms like graph algorithms (e.g., minimum
            spanning trees, maximum flow), string algorithms (e.g., pattern
            matching, string compression), approximation algorithms, and
            randomized algorithms.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Cryptography and Network Security</h1>
          <p>
            Dive into cryptographic algorithms, protocols, and techniques for
            secure communication. Learn about encryption schemes, digital
            signatures, key exchange protocols, authentication mechanisms, and
            network security vulnerabilities.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Compiler Design and Optimization</h1>
          <p>
            Understand the design and implementation of compilers, including
            lexical analysis, parsing techniques, semantic analysis, code
            generation, and optimization techniques.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Artificial Intelligence</h1>
          <p>
            Explore advanced topics in AI, including natural language
            processing, computer vision, reinforcement learning, deep learning,
            neural network architectures (e.g., CNN, RNN, GANs), and advanced
            optimization algorithms.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>High-Performance Computing</h1>
          <p>
            Study techniques for optimizing code performance, including parallel
            algorithms, parallel programming models (e.g., CUDA, OpenCL),
            vectorization, memory optimization, and cache-efficient algorithms.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Distributed Systems</h1>
          <p>
            Deepen your understanding of distributed systems, including
            distributed algorithms, consensus protocols, fault tolerance,
            distributed storage systems, and distributed file systems.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Cloud Computing</h1>
          <p>
            Learn about cloud computing architectures, virtualization,
            containerization (e.g., Docker, Kubernetes), cloud infrastructure
            services (e.g., AWS, Azure), serverless computing, and scalability.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Internet of Things (IoT)</h1>
          <p>
            Explore the IoT ecosystem, including sensor networks, IoT protocols
            (e.g., MQTT, CoAP), IoT data analytics, IoT security and privacy,
            and applications of IoT in various domains.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Big Data and Data Engineering</h1>
          <p>
            Gain expertise in handling large-scale data processing and
            analytics. Study technologies like Hadoop, Spark, NoSQL databases,
            data streaming, distributed file systems, and data warehousing.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Human-Computer Interaction (HCI)</h1>
          <p>
            Understand principles and techniques for designing intuitive and
            user-friendly interfaces. Learn about user research, interaction
            design, usability testing, accessibility, and user-centered design
            methodologies.
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Computer Vision and Image Processing</h1>
          <p>
            Dive into advanced image processing techniques, object detection and
            recognition, image segmentation, feature extraction, image
            restoration, and computer vision applications (e.g., autonomous
            vehicles, facial recognition).
            <br />
            <br />
          </p>
        </div>

        <div className="carddd">
          <h1>Quantum Computing</h1>
          <p>
            Explore the fundamentals of quantum computing, quantum algorithms
            (e.g., Shor's algorithm, Grover's algorithm), quantum gates, quantum
            information theory, and quantum programming languages (e.g., Q#).
            <br />
            <br />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">
        <img className="logo-login" src={LogoWhiteText} alt="Logo" />
      </Link>
      <div> {selectedRoadmap}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Roadmap;
