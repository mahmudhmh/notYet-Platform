import React from "react";
import classes from "./PP.module.css";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
import Backgroundgif from "../../UI/Backgroundgif";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
function PP() {
  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div>
        <div className={classes.header1}>
          <h1>Privacy & Policy</h1>
          <p className={classes.line}>______________________</p>
          <div className={classes.text}>
            <p>
              Thank you for using the notYet platform , a web application
              designed to assist students in competitive programming and
              problem-solving to prepare for technical interviews. We are
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our Platform. By using the Platform, you consent to the data
              practices described in this policy. Information We Collect
            </p>
            <p>
              {" "}
              Personal Information: When you register for an account on the
              Platform, we may collect personal information such as your name,
              email address, and other contact details. This information is
              necessary for the functioning of the Platform and to provide you
              with a personalized experience.{" "}
            </p>
            <p>
              {" "}
              Usage Information: We may collect non-personal information about
              your use of the Platform, such as your IP address, browser type,
              referring/exit pages, and operating system. This information is
              used to analyze trends, administer the Platform, track user
              movements, and gather demographic information for aggregate use.{" "}
            </p>
            <p>
              Cookies: We may use cookies and similar tracking technologies to
              enhance your experience on the Platform. Cookies are small files
              that are placed on your device for various purposes, including to
              improve security, personalize content, and analyze usage patterns.
              You can manage your cookie preferences through your browser
              settings. Use of Information{" "}
            </p>
            <p>
              {" "}
              Personal Information: We may use your personal information to
              create and maintain your account, communicate with you about the
              Platform, send you important notices, and respond to your
              inquiries or support requests. We may also use your information to
              provide you with relevant content, updates, and promotional
              materials.{" "}
            </p>
            <p>
              {" "}
              Usage Information: We use usage information to analyze trends,
              monitor the effectiveness of the Platform, and gather demographic
              information. This information helps us improve the Platform's
              features, functionality, and user experience. Data Sharing and
              Disclosure{" "}
            </p>
            <p>
              Service Providers: We may engage third-party service providers to
              perform functions on our behalf, such as hosting the Platform,
              analyzing data, and providing customer support. These service
              providers have access to personal information only to the extent
              necessary to perform their functions and are obligated to maintain
              the confidentiality and security of the data.{" "}
            </p>
            <p>
              Legal Requirements: We may disclose your information if required
              to do so by law or in response to valid requests from public
              authorities (e.g., court orders, government agencies).{" "}
            </p>
            <p>
              Business Transfers: In the event of a merger, acquisition, or sale
              of all or a portion of our assets, your information may be
              transferred or disclosed as part of the transaction. We will take
              reasonable steps to ensure the security and confidentiality of the
              information during such transfers.{" "}
            </p>
            <p>
              Data Security We implement reasonable security measures to protect
              the confidentiality, integrity, and availability of your
              information. However, please note that no method of transmission
              over the internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security. Third-Party Links and Services
              The Platform may contain links to third-party websites,
              applications, or services.{" "}
            </p>
            <p>
              {" "}
              This Privacy Policy does not apply to such third-party services,
              and we are not responsible for their privacy practices. We
              encourage you to review the privacy policies of those third
              parties before providing any personal information.{" "}
            </p>
            <p>
              Children's Privacy The Platform is not intended for use by
              individuals under the age of 13. We do not knowingly collect
              personal information from children. If we become aware that we
              have collected personal information from a child under the age of
              13, we will take steps to delete that information. Changes to this
              Privacy Policy We reserve the right to modify this Privacy Policy
              at any time. Any changes will be effective immediately upon
              posting the updated Privacy Policy on the Platform.{" "}
            </p>
            <p>
              {" "}
              We encourage you to review this Privacy Policy periodically for
              any updates. Contact Us If you have any questions or concerns
              about this Privacy Policy or our data practices, please contact us
              at<Link to="/contact us">Contact Us</Link>. By using the notYet
              platform, you acknowledge that you have read and understood this
              Privacy Policy and consent to the collection, use, and disclosure
              of your information as described herein.
            </p>
          </div>
          <Link to="/login">
            <Button>Join !YET</Button>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default PP;
