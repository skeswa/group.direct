/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Privacy = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Privacy Policy');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">
                    <div className="title">Privacy Policy</div>
                    <div className="single-column">

                        <h2>General</h2>

                        At GroupConnect Corporation, we respect your need for online privacy and protect any Personal Information that you may share with us, in an appropriate manner. Our practice as regards use of your Personal Information is as set forth below in this Privacy Policy Statement. As a condition to use of GroupConnect Services, you consent to the terms of the Privacy Policy Statement as it may be updated from time to time. In the event of a material change, we shall notify you via email or by means of a prominent notice on the website. This Privacy Policy Statement applies exclusively to <a href="http://group.direct">http://group.direct</a>.

                        <h2>Children's Online Privacy Protection</h2>

                        GroupConnect does not knowingly collect Personal Information from users who are under 13 years of age.

                        <h2>Demo Login</h2>

                        Since we understand that you may wish not to disclose your Personal Information for trying out our GroupConnect Services, we provide you the option of a Demo Login for some of the GroupConnect Services. The contents created by you using the Demo Login will be accessible to all persons using the Demo Login. Hence we specifically request you not to store your personal and sensitive information, files and documents while using the Demo Login as doing so would make them publicly available to all users and consequently may result in your receipt of unsolicited messages.

                        <h2>Information Recorded and Use:</h2>
                            <ul>
                                <li>Personal Information</li>

                                    During the Registration Process for creating a user account, we request for your name and email address. You will also be asked to choose a unique username and a password, which will be used solely for the purpose of providing access to your user account. Upon registration you will have the option of choosing a security question and an answer to the security question, which if given, will be used solely for the purpose of resetting your password. Your name and email address will be used to inform you regarding new services, releases, upcoming events and changes in this Privacy Policy Statement. When you elect to sign up for a user account, you also have the option to create the user account using any of the trusted third party user authentication services integrated with GroupConnect Services. In doing so, no Personal Information within your third party email accounts is transferred to your user account without your explicit consent.
                                    <br/><br/>
                                    GroupConnect will have access to third party personal information provided by you as part of using GroupConnect Services such as contacts in your GroupConnect Mail account. This information may include third party names, email addresses, phone numbers and physical addresses and will be used for servicing your requirements as expressed by you to GroupConnect and solely as part and parcel of your use of GroupConnect Services. We do not share this third party personal information with anyone for promotional purposes, nor do we utilize it for any purposes not expressly consented to by you. When you elect to refer friends to the website, we request their email address and name to facilitate the request and deliver this one time email.
                                    <br/><br/>
                                    We post user testimonials on the website. These testimonials may include names and we acquire permission from our users prior to posting these on the website. GroupConnect is not responsible for the Personal Information users elect to post within their testimonials.
                                    <br/><br/>
                                <li>Usage Details</li>

                                    Your usage details such as time, frequency, duration and pattern of use, features used and the amount of storage used will be recorded by us in order to enhance your experience of the GroupConnect services and to help us provide you the best possible service.
                                    <br/><br/>
                                <li>Contents of your User Account</li>

                                    We store and maintain files, documents, to-do lists, emails and other data stored in your user account at our facilities in the United States. In order to prevent loss of data due to errors or system failures, we also keep backup copies of data including the contents of your user account. Hence your files and data may remain on our servers even after deletion or termination of your user account. We assure you that the contents of your user account will not be disclosed to anyone and will not be accessible even to employees of GroupConnect except in circumstances specifically mentioned in this Privacy Policy Statement and Terms of Services. We also do not process the contents of your user account for serving targeted advertisements.
                                    <br/><br/>
                                <li>Financial Information</li>

                                    In case of services requiring payment, we request credit card or other payment account information, which will be used solely for processing payments. Your financial information will not be stored by us except for the name and address of the card holder, the expiry date and the last four digits of the Credit Card number. Subject to your prior consent and where necessary for processing future payments, your financial information will be stored in encrypted form on secure servers of our reputed Payment Gateway Service Provider who is beholden to treating your Personal Information in accordance with this Privacy Policy Statement.
                                    <br/><br/>
                                <li>Visitor Details</li>

                                    We use the Internet Protocol address, browser type, browser language, referring URL, files accessed, errors generated, time zone, operating system and other visitor details collected in our log files to analyze the trends, administer the website, track visitor's movements and to improve our website.
                            </ul>
                        <h2>Cookies</h2>

                        We use temporary and permanent cookies to enhance your experience of our GroupConnect Services. Temporary cookies will be removed from your computer each time you close your browser. By selecting ‘keep me signed-in’ option in GroupConnect Services, a permanent cookie will be stored in your computer and you will not be required to sign-in by providing complete login information each time you return to our website. If you have turned cookies off, you may not be able to use registered areas of the website. We tie cookie information to your email address when you elect to remain logged in so as to maintain and recall your preferences within the website. We may from time to time employ the use of pixel tags on the website and in emails. Pixel tags such as web beacons are 1x1 images that are embedded onto a web page to document traffic and for website analytics without collecting any Personal Information.
                        <br/><br/>
                        We may from time to time employ the services of a third party agent to analyze statistical and aggregate data about our website content and user base. This aggregated information is not personally identifiable and is employed in improving website functionality and offerings. To this end, these third parties may employ the use of cookies and, or pixel tags in providing their services. While these third party cookies are not tied to your Personal Information, GroupConnect does not have access to these cookies nor are we responsible for them.
                        <h2>Links from our website</h2>

                        Some pages of our website contain external links. You are advised to verify the privacy practices of such other websites. We are not responsible for the manner of use or misuse of information made available by you at such other websites. We encourage you not to provide Personal Information, without assuring yourselves of the Privacy Policy Statement of other websites.
                        <h2>With whom we share Information</h2>

                        We may need to disclose Personal Information to our affiliates, service providers and business partners solely for the purpose of providing GroupConnect Services to you. In such cases GroupConnect will also ensure that such affiliates, service providers and business partners comply with this Privacy Policy Statement and adopt appropriate confidentiality and security measures. We will obtain your prior specific consent before we share or disclose your Personal Information to any person outside GroupConnect for any purpose that is not directly connected with providing GroupConnect Services to you. We may share generic aggregated demographic information not linked to any Personal Information regarding visitors and users with our business partners and advertisers. Please be aware that laws in various jurisdictions in which we operate may obligate us to disclose user information and the contents of your user account to the local law enforcement authorities under a legal process or an enforceable government request. In addition, we may also disclose Personal Information and contents of your user account to law enforcement authorities if such disclosure is determined to be necessary by GroupConnect in our sole and absolute discretion for protecting the safety of our users, employees, or the general public.
                        <h2>How secure is your Information</h2>

                        We adopt industry appropriate data collection, storage and processing practices and security measures, as well as physical security measures to protect against unauthorized access, alteration, disclosure or destruction of your Personal Information, username, password, transaction information and data stored in your user account. Access to your name and email address is restricted to our employees who need to know such information in connection with providing GroupConnect Services to you and are bound by confidentiality obligations.
                        <h2>Your Choice in Information Use</h2>

                        You will be required to register for our GroupConnect Services by providing Personal Information. If you choose not to provide your Personal Information, we will be unable to provide you the GroupConnect Services. We do provide you with the option of not choosing a secret question and the answer to it; however, we may not be able to reset your password for you. We also provide you with the option of opting out from receiving mail from us; however, you will not be able to receive email notifications of new services, releases, upcoming events and changes to the Privacy Policy Statement should you decide to opt-out of receiving all messages from GroupConnect. In the event we decide to use your Personal Information for any purpose other than as stated in this Privacy Policy Statement, we will offer you an effective way to opt out of the use of your Personal Information for those other purposes. You may opt out of receiving newsletters and other secondary messages from GroupConnect by selecting the ‘unsubscribe’ function present in every message we send.
                        <h2>Accessing, Updating and Removing Personal Information</h2>

                        We provide users with access to their Personal Information. Users may correct, update or remove any such Personal Information either by accessing their user account or by contacting GroupConnect Customer Support Services. Such changes may take up to 48 hours to take effect. We respond to all enquiries within 30 days.
                        <h2>Investigation of Illegal Activity</h2>

                        We may need to provide access to your Personal Information and the contents of your user account to our employees and service providers for the purpose of investigating any suspected illegal activity or potential violation of the terms and conditions for use of GroupConnect Services. However, GroupConnect will ensure that such access is in compliance with this Privacy Policy Statement and subject to appropriate confidentiality and security measures.
                        <h2>Enforcement of Privacy Policy</h2>

                        We make every effort, including periodic reviews to ensure that Personal Information provided by you is used in conformity with this Privacy Policy Statement. If you have any concerns regarding our adherence to this Privacy Policy Statement or the manner in which Personal Information is used for the purpose of providing GroupConnect Services, kindly contact GroupConnect Customer Support Services at support@GroupConnectcorp.com . We will contact you to address your concerns and we will also co-operate with regulatory authorities in this regard if needed.
                        <h2>Notification of Changes</h2>

                        Any changes to the Privacy Policy Statement will be posted on our website in order to keep you informed of any changes in nature of information collected, manner of collection, use and sharing of information. If at any point we decide to use Personal Information in a manner different from that stated at the time it was collected, we will notify you by email and provide you with the ability to opt out of these new uses unless you have opted out from receiving all email notifications from us. You will not receive email notification of minor changes to the Privacy Policy Statement. If you are concerned about how your Personal Information is used, you should check back at <a href = "http://group.direct/privacy">http://group.direct/privacy</a> periodically.
                        <h2>Blogs and Forums</h2>

                        We provide the capacity for users to post information in blogs and forums for sharing information in a public space on the website. This information is publicly available to all users of these forums and visitors to GroupConnect. We require registration to publish information, but given the public nature of both platforms, any Personal Information disclosed within these forums may be used to contact users with unsolicited messages. We encourage users to be cautious in disclosure of Personal Information in public forums as GroupConnect is not responsible for the Personal Information users elect to disclose.

                        GroupConnect also supports third party widgets on the website that allow users to share articles and other information on different platforms. These widgets do not collect or store any Personal Information from users on the website and simply act as a bridge for your convenience in sharing information.
                        <h2>END OF PRIVACY POLICY</h2>

                        If you have any questions or concerns regarding this Privacy Policy Statement, please contact us at legal@GroupConnectcorp.com . We shall respond to all inquiries within 30 days of receipt upon ascertaining your identity.

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Privacy;