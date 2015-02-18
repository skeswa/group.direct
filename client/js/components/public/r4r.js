/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var R4R = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Report For Results');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">

                    <div className="title">Report For Results</div>

                    <div className="single-column">
                        THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (hereinafter “You” or “Your”) AND GROUP CONNECT (hereinafter "Group Connect") GOVERNING YOUR USE OF GROUP CONNECT SUITE OF ONLINE BUSINESS PRODUCTIVITY AND COLLABORATION SOFTWARE (hereinafter "Group Connect Service(s)”).

                        <h2>Parts of this Agreement</h2>

                        This Agreement consists of the following terms and conditions (hereinafter the “General Terms”) and terms and conditions, if any, specific to use of individual Services (hereinafter the “Service Specific Terms”). The General Terms and Service Specific Terms are collectively referred to as the “Terms”. In the event of a conflict between the General Terms and Service Specific Terms, the Service Specific Terms shall prevail.

                        <h2>Acceptance of the Terms</h2>

                        You must be of legal age to enter into a binding agreement in order to accept the Terms. If you do not agree to the General Terms, do not use any of our Services. If you agree to the General Terms and do not agree to any Service Specific Terms, do not use the corresponding Service. You can accept the Terms by checking a checkbox or clicking on a button indicating your acceptance of the terms or by actually using the Services.

                        <h2>Description of Service</h2>

                        We provide an array of services for online collaboration and management including word processor, spreadsheet, presentation tool, database application creator, email client, chat client, organizer, customer relationship management application and project management application ("Service" or "Services"). You may use the Services for your personal and business use or for internal business purpose in the organization that you represent. You may connect to the Services using any Internet browser supported by the Services. You are responsible for obtaining access to the Internet and the equipments necessary to use the Services. You can create and edit content with your user account and if you choose to do so, you can publish and share such content.
                        <h2>Subscription to Beta Service</h2>

                        We may offer certain Services as closed or open beta services ("Beta Service" or “Beta Services”) for the purpose of testing and evaluation. You agree that we have the sole authority and discretion to determine the period of time for testing and evaluation of Beta Services. We will be the sole judge of the success of such testing and the decision, if any, to offer the Beta Services as commercial services. You will be under no obligation to acquire a subscription to use any paid Service as a result of your subscription to any Beta Service. We reserve the right to fully or partially discontinue, at any time and from time to time, temporarily or permanently, any of the Beta Services with or without notice to you. You agree that GroupConnect will not be liable to you or to any third party for any harm related to, arising out of, or caused by the modification, suspension or discontinuance of any of the Beta Services for any reason.
                        <h2>Modification of Terms of Service</h2>

                        We may modify the Terms upon notice to you at any time. You will be provided notice of any such modification by electronic mail or by publishing the changes on the website <a href="http://group.direct/terms">http://group.direct/terms</a>. You may terminate your use of the Services if the Terms are modified in a manner that substantially affects your rights in connection with use of the Services. Your continued use of the Service after notice of any change to the Terms will be deemed to be your agreement to the amended Terms.
                        <h2>User Sign up Obligations</h2>

                        You need to sign up for a user account by providing all required information in order to access or use the Services. If you represent an organization and wish to use the Services for corporate internal use, we recommend that you, and all other users from your organization, sign up for user accounts by providing your corporate contact information. In particular, we recommend that you use your corporate email address. You agree to: a) provide true, accurate, current and complete information about yourself as prompted by the sign up process; and b) maintain and promptly update the information provided during sign up to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, outdated, or incomplete, or if GroupConnect has reasonable grounds to suspect that such information is untrue, inaccurate, outdated, or incomplete, GroupConnect may terminate your user account and refuse current or future use of any or all of the Services.
                        <h2>Personal Information and Privacy</h2>

                        Personal information you provide to GroupConnect through the Service is governed by GroupConnect Privacy Policy. Your election to use the Service indicates your acceptance of the terms of the GroupConnect Privacy Policy. You are responsible for maintaining confidentiality of your username, password and other sensitive information. You are responsible for all activities that occur in your user account and you agree to inform us immediately of any unauthorized use of your user account by email to accounts@groupconnect.com or by calling us on any of the numbers listed on <a href="http://group.direct/contact">http://group.direct/contact</a>. We are not responsible for any loss or damage to you or to any third party incurred as a result of any unauthorized access and/or use of your user account, or otherwise.
                        <h2>Communications from GroupConnect</h2>

                        The Service may include certain communications from GroupConnect, such as service announcements, administrative messages and newsletters. You understand that these communications shall be considered part of using the Services. As part of our policy to provide you total privacy, we also provide you the option of opting out from receiving newsletters from us. However, you will not be able to opt-out from receiving service announcements and administrative messages.
                        <h2>Fees and Payments</h2>

                        Subscriptions to paid Services are available on monthly and yearly subscription plans. Your subscription will be automatically renewed at the end of each subscription period unless you inform us that you do not wish to renew the subscription. The subscription fee will be charged to the Credit Card last used by you. If you would like the payment for the renewal to be made through a different Credit Card or if you do not wish to renew the subscription, you agree to inform us at least seven days prior to the renewal date. In the event of termination of the subscription, you will be refunded the subscription fee for the unused portion of the subscription period. GroupConnect reserves the right to change the subscription fee and to charge for use of Services that are currently available free of charge. You will not be charged for using any Service unless you have opted for a paid subscription plan.
                        <h2>Restrictions on Use</h2>

                        In addition to all other terms and conditions of this Agreement, you shall not: (i) transfer or otherwise make available to any third party the Services; (ii) provide any service based on the Services without prior written permission; (iii) use the third party links to sites without agreeing to their website terms & conditions; (iv) post links to third party sites or use their logo, company name, etc. without their prior written permission; or (v) use the Services for spamming and other illegal purposes.
                        <h2>Spamming and Illegal Activities</h2>

                        You agree to be solely responsible for the contents of your transmissions through the Services. You agree not to use the Services for illegal purposes or for the transmission of material that is unlawful, defamatory, harassing, libelous, invasive of another's privacy, abusive, threatening, harmful, vulgar, pornographic, obscene, or is otherwise objectionable, offends religious sentiments, promotes racism, contains viruses, or that which infringes or may infringe intellectual property or other rights of another. You agree not to use the Services for the transmission of "junk mail", "spam", "chain letters", “phishing” or unsolicited mass distribution of email. We reserve the right to terminate your access to the Services if there are reasonable grounds to believe that you have used the Services for any illegal or unauthorized activity.
                        <h2>Inactive User Accounts Policy</h2>

                        We reserve the right to terminate unpaid user accounts that are inactive for a continuous period of 120 days. In the event of such termination, all data associated with such user account will be deleted. We will provide you prior notice of such termination and backup of your data by email. The data deletion policy may be implemented with respect to any or all of the Services. Each Service will be considered an independent and separate service for the purpose of calculating the period of inactivity. In other words, activity in one of the Services is not sufficient to keep your user account in another Service active. In case of accounts with more than one user, if at least one of the users is active, the account will not be considered inactive.
                        <h2>Data Ownership</h2>

                        We respect your right to ownership of content created or stored by you. You own the content created or stored by you. Unless specifically permitted by you, your use of the Services does not grant GroupConnect the license to use, reproduce, adapt, modify, publish or distribute the content created by you or stored in your user account for GroupConnect’s commercial, marketing or any similar purpose. But you grant GroupConnect permission to access, copy, distribute, store, transmit, reformat, publicly display and publicly perform the content of your user account solely as required for the purpose of providing the Services to you.
                        <h2>User Generated Content</h2>

                        You may transmit or publish content created by you using any of the Services or otherwise. However, you shall be solely responsible for such content and the consequences of its transmission or publication. Any content made public will be publicly accessible through the internet and may be crawled and indexed by search engines. You are responsible for ensuring that you do not accidentally make any private content publicly available. Any content that you may receive from other users of the Services, is provided to you AS IS for your information and personal use only and you agree not to use, copy, reproduce, distribute, transmit, broadcast, display, sell, license or otherwise exploit such content for any purpose, without the express written consent of the person who owns the rights to such content. In the course of using any of the Services, if you come across any content with copyright notice(s) or any copy protection feature(s), you agree not to remove such copyright notice(s) or disable such copy protection feature(s) as the case may be. By making any copyrighted/copyrightable content available on any of the Services you affirm that you have the consent, authorization or permission, as the case may be from every person who may claim any rights in such content to make such content available in such manner. Further, by making any content available in the manner aforementioned, you expressly agree that GroupConnect will have the right to block access to or remove such content made available by you, if GroupConnect receives complaints concerning any illegality or infringement of third party rights in such content. By using any of the Services and transmitting or publishing any content using such Service, you expressly consent to determination of questions of illegality or infringement of third party rights in such content by the agent designated by GroupConnect for this purpose.
                        <br/><br/>
                        For procedure relating to complaints of illegality or infringement of third party rights in content transmitted or published using the Services, click here.
                        <br/><br/>
                        If you wish to protest any blocking or removal of content by GroupConnect, you may do so in the manner provided here.
                        <h2>Sample files and Applications</h2>

                        GroupConnect may provide sample files and applications for the purpose of demonstrating the possibility of using the Services effectively for specific purposes. The information contained in any such sample files and applications consists of random data. GroupConnect makes no warranty, either express or implied, as to the accuracy, usefulness, completeness or reliability of the information or the sample files and applications.
                        <h2>Trademark</h2>

                        GroupConnect, GroupConnect logo, the names of individual Services and their logos are trademarks of GroupConnect Corporation. You agree not to display or use, in any manner, the GroupConnect trademarks, without GroupConnect’s prior permission.
                        <h2>Disclaimer of Warranties</h2>

                        YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN AS-IS-AND-AS-AVAILABLE BASIS. GROUPCONNECT EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. GroupConnect MAKES NO WARRANTY THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR VIRUS FREE. USE OF ANY MATERIAL DOWNLOADED OR OBTAINED THROUGH THE USE OF THE SERVICES SHALL BE AT YOUR OWN DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM, MOBILE TELEPHONE, WIRELESS DEVICE OR DATA THAT RESULTS FROM THE USE OF THE SERVICES OR THE DOWNLOAD OF ANY SUCH MATERIAL. NO ADVICE OR INFORMATION, WHETHER WRITTEN OR ORAL, OBTAINED BY YOU FROM GROUPCONNECT, ITS EMPLOYEES OR REPRESENTATIVES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THE TERMS.
                        <h2>Limitation of Liability</h2>

                        YOU AGREE THAT GROUPCONNECT SHALL, IN NO EVENT, BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, SPECIAL, PUNITIVE, OR OTHER LOSS OR DAMAGE WHATSOEVER OR FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, COMPUTER FAILURE, LOSS OF BUSINESS INFORMATION, OR OTHER LOSS ARISING OUT OF OR CAUSED BY YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF GROUPCONNECT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH GROUPCONNECT RELATED TO ANY OF THE SERVICES SHALL BE TERMINATION OF SUCH SERVICE. IN NO EVENT SHALL GROUPCONNECT’S ENTIRE LIABILITY TO YOU IN RESPECT OF ANY SERVICE, WHETHER DIRECT OR INDIRECT, EXCEED THE FEES PAID BY YOU TOWARDS SUCH SERVICE.
                        <h2>Indemnification</h2>

                        You agree to indemnify and hold harmless GroupConnect, its officers, directors, employees, suppliers, and affiliates, from and against any losses, damages, fines and expenses (including attorney's fees and costs) arising out of or relating to any claims that you have used the Services in violation of another party's rights, in violation of any law, in violations of any provisions of the Terms, or any other claim related to your use of the Services, except where such use is authorized by GroupConnect.
                        <h2>Arbitration</h2>

                        Any controversy or claim arising out of or relating to the Terms shall be settled by binding arbitration in accordance with the commercial arbitration rules of the American Arbitration Association. Any such controversy or claim shall be arbitrated on an individual basis, and shall not be consolidated in any arbitration with any claim or controversy of any other party. The decision of the arbitrator shall be final and unappealable. The arbitration shall be conducted in California and judgment on the arbitration award may be entered into any court having jurisdiction thereof. Notwithstanding anything to the contrary, GroupConnect may at any time seek injunctions or other forms of equitable relief from any court of competent jurisdiction.
                        <h2>Suspension and Termination</h2>

                        We may suspend your user account or temporarily disable access to whole or part of any Service in the event of any suspected illegal activity, extended periods of inactivity or requests by law enforcement or other government agencies. Objections to suspension or disabling of user accounts should be made to legal@groupconnect.com within thirty days of being notified about the suspension. We may terminate a suspended or disabled user account after thirty days. We will also terminate your user account on your request. In addition, we reserve the right to terminate your user account and deny the Services upon reasonable belief that you have violated the Terms and to terminate your access to any Beta Service in case of unexpected technical issues or discontinuation of the Beta Service. Termination of user account will include denial of access to all Services, deletion of information in your user account such as your e-mail address and password and deletion of all data in your user account.
                        <h2>END OF TERMS OF SERVICE</h2>

                        If you have any questions or concerns regarding this agreement, please contact us at legal@groupconnect.com .



                    </div>
                </div>
            </div>
        );
    }
});

module.exports = R4R;
