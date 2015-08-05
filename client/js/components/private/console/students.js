/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var steps = [
    //0:view students
    function (component) {
        var studentElements = [];
        for (var i=0; i<component.state.students.length; i++) {
            var currentStudent = component.state.students[i];
	    if (currentStudent.PickupDropPoints){
	            studentElements.push(
         	       <div className="row">
                	    <div className="grid narrow">
                        	<div className="profile-pic" onClick={component.createExecutable(component.onStudentClick, currentStudent)}>
	                            <i className="fa fa-user"></i>
        	                </div>
                	    </div>
	                    <div className="grid wide">{currentStudent.FirstName} {currentStudent.LastName}</div>
        	            <div className="grid">{currentStudent.StudentId}</div>
                	    <div className="grid">{currentStudent.Grade}</div>
	                    <div className="grid">{currentStudent.PickupDropPoints[0].RoutePointId}</div>
        	            <div className="grid">{currentStudent.PickupDropPoints[0].PickedUpDropTime} / {currentStudent.PickupDropPoints[1].PickedUpDropTime}</div>
	                    {/*<div className="grid wide">{currentStudent.Guardians[0].FirstName} {currentStudent.Guardians[0].LastName}</div>*/}
        	            <div className="grid"><div className="remove-button"><i className="fa fa-close" onClick={component.createExecutable(component.deleteStudent, currentStudent.Id)}></i></div></div>
	                </div>
        	    );
		}
        }
        return (
            <div>
                <div className="row title">
                    <div className="grid narrow"></div>
                    <div className="grid wide">Name</div>
                    <div className="grid">Student ID</div>
                    <div className="grid">Grade</div>
                    <div className="grid">Route #</div>
                    <div className="grid">Pickup/Drop</div>
                    {/*<div className="grid">Parents</div>*/}
                </div>
                {studentElements}
            </div>
        );
    },
    //1:add students
    function (component) {
    // var busRoute = null,
    //     busStop = null;
    //console.log('routePointId at render', component.state.routePointId);
        if (!component.state.read) {
            var routeElements = [];
            for (var i=0; i<component.state.routes.length; i++) {
                var currentRoute = component.state.routes[i];
                routeElements.push(
                    <option id={i} value={currentRoute.Name} onClick={component.onRouteClick}>{currentRoute.Name}</option>
                );
            }
            var stopElements = [];
            var r = component.state.position;
            console.log('Here: ', r);
            if (component.state.routes[r].RoutePointResponseList[0]) {
                for (var i=0; i<component.state.routes[r].RoutePointResponseList.length; i++) {
                    var currentStop = component.state.routes[r].RoutePointResponseList[i];
                    if(!currentStop.LocationResponse) {
                        stopElements.push(
                            <option value='Address Not Found'>Address Not Found</option>
                        );
                    } else {
                        stopElements.push(
                            <option value={currentStop.LocationResponse.Address}>{currentStop.LocationResponse.Address}</option>
                        );
                    }
                }
            } else {
                console.log('No stop found.');
            }
        }
        //console.log(component.state.busRoute, component.state.busStop);
        return (
            <div>
                <div className="left narrower">
                    <div className="profile-pic big">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="label small">Bus Route</div>
                    <input type="text" className={"textbox smaller" + (component.state.read ? '' : ' invisible')} value={component.state.busRoute}/>
                    <select value={component.state.selectValue} onChange={component.handleChange} className={"textbox smaller" + (component.state.read ? ' invisible' : '')} >
                        {routeElements}
                    </select>
                    <div className="label small">Bus Stop</div>
                    <input type="text" className={"textbox smaller" + (component.state.read ? '' : ' invisible')} value={component.state.busStop}/>
                    <select value={component.state.selectStopValue} onChange={component.handleStopChange} className={"textbox smaller" + (component.state.read ? ' invisible' : '')} >
                        {stopElements}
                    </select>
                    {/*<div className="label small">School Bus ID</div>
                    <input type="text" className="textbox smaller"  onChange={component.onSomethingChanged}/>

                    <div className="label small">Pick up</div>
                    <input type="text" className="textbox smaller"  onChange={component.onSomethingChanged}/>

                    <div className="label small">Drop Off</div>
                    <input type="text" className="textbox smaller"  onChange={component.onSomethingChanged}/>*/}
                </div>
                <div className="form">
                    <div className="field">
                        <div className="label">First Name</div>
                        <input type="text" className="textbox" value={component.state.firstName} onChange={component.onFirstNameChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Last Name</div>
                        <input type="text" className="textbox" value={component.state.lastName}  onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Student ID</div>
                        <input type="text" className="textbox" value={component.state.studentId} onChange={component.onStudentIdChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Grade</div>
                        <input type="text" className="textbox" value={component.state.grade} onChange={component.onGradeChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Gender</div>
                        <input type="radio"  name="gender" value="Male" onChange={component.onMaleChecked}/> Male
                        <input type="radio"  name="gender" value="Female" onChange={component.onFemaleChecked}/> Female
                    </div>
                    {/*<div className="field">
                        <div className="label">Home Phone</div>
                        <input type="text" className="textbox" onChange={this.onPhoneChanged}/>
                    </div>*/}
                    <div className={"field"  + (component.state.read ? ' invisible' : '')}>
                        <div className="label title">Address</div>
                        <input type="text" className="textbox narrow" placeholder="Street"  onChange={component.onAddress1Changed}/>
                        <input type="text" className="textbox narrow" placeholder="Apt/Unit" onChange={component.onAddress2Changed}/>
                        <input type="text" className="textbox narrow" placeholder="City" onChange={component.onCityChanged}/>
                        <input type="text" className="textbox narrow" placeholder="State" onChange={component.onStateChanged}/>
                        <input type="text" className="textbox narrow" placeholder="Zip" onChange={component.onZipChanged}/>
                    </div>
                    {/*<div className="field">
                        <div className="label title">Guardian</div>
                        <input type="text" className="textbox narrow" onChange={component.onAddress1Changed}/>
                        <input type="text" className="textbox small" onChange={component.onAddress2Changed}/>
                        <input type="text" className="textbox small" onChange={component.onCityChanged}/>
                        <input type="text" className="textbox small" onChange={component.onProvinceChanged}/>
                    </div>*/}
                    <div className="field btn" >
                        <div className="label"></div>
                        <button type="submit" id="save-profile-button" className={"button" + (component.state.read ? ' invisible' : '')} onClick={component.onSubmitClick}>Save</button>
                        <button type="submit" id="back-button" className="back button" onClick={component.onBackClick}>Back to List</button>
                    </div>
                </div>
            </div>
        );
    },
];

var Students = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return {
            step: 0,
            companyId: AppStateStore.getSessionData().companyId,
            sessionToken: AppStateStore.getSessionData().sessionToken,
            students: [],
            selectValue: 'Select Route',
            selectStopValue: 'Select Stop',
            toastMessage: undefined,
            routes: undefined,
            stopData: undefined,
            position: 0
        }
    },
    componentDidMount: function() {
        var component   = this;
        Actions.changePageTitle('SchoolBus Connect');


        //Get all students to populate the student list.
        //TODO: Show students by grade
        //TODO: Enable search
        SchoolBusService.getAllStudents(
            this.state.companyId,
            this.state.sessionToken,
            function(res){
                if (res.body.ResultSet) {
                    component.setState({
                        students: res.body.ResultSet
                    });
                } else {
                    console.log('Error at getAllStudents', res.text);
                }
            });

        //Get all routes to populate values in dropdown
        //TODO: Eliminate extra service call, get this data from routes.js - or whereever the route data is loaded first
        SchoolBusService.getRoutes(
            AppStateStore.getSessionData().sessionToken,
            AppStateStore.getSessionData().companyId,
            function (res) {
                if (res.body.ResultSet) {
                    component.setState({
                        routes: res.body.ResultSet,
                        routePointId: res.body.ResultSet[0].RoutePointResponseList[0].Id
                    });
                } else {
                    console.log('Error at getRoutes', res.text);
                }
            });

    },
    onStopClick: function(currentStop, event) {
        this.setState({
            routePointId: currentStop.Id
        });

    },
    onRouteClick: function(event) {
        console.log('onRouteClick');
        // this.setState({
        //         position: i
        //     });
    },
    onAddClick: function(event) {
        this.setState({
            step: 1,
            firstName: undefined,
            lastName: undefined,
            studentId: undefined,
            grade: undefined,
            routePointId: this.state.routes[0].RoutePointResponseList[0].Id,
            read: 0,
            toastMessage: undefined
        });
    },
    onStudentClick: function(currentStudent, event) {
        var component = this;
        console.log('in read', currentStudent.PickupDropPoints[0].RoutePointId);
            outer_loop:
            for (var i=0; i<this.state.routes.length; i++) {
                for(var j=0; j<this.state.routes[i].RoutePointResponseList.length; j++) {
                    console.log('Route #', i, 'Stop #', j, this.state.routes[i].RoutePointResponseList[j].Id);
                    if (currentStudent.PickupDropPoints[0].RoutePointId == this.state.routes[i].RoutePointResponseList[j].Id) {
                        console.log('match found');
                        this.setState({
                            busRoute: component.state.routes[i].Name,
                            busStop: component.state.routes[i].RoutePointResponseList[j].LocationResponse.Address
                        });
                        break outer_loop;
                    }
                }
            }
        this.setState({
            step: 1,
            firstName: currentStudent.FirstName,
            lastName: currentStudent.LastName,
            studentId: currentStudent.StudentId,
            grade: currentStudent.Grade,
            read: 1,
            toastMessage: undefined
        });
    },
    setRouteStop: function(busRoute, busStop) {
        this.setState({
            busRoute: busRoute,
            busStop: busStop
        });
        console.log('setRouteStop', busRoute, busStop);
    },
    handleChange: function(e){
        this.setState({selectValue:e.target.value});
        for (i=0; i<this.state.routes.length; i++) {
            if(this.state.routes[i].Name == e.target.value) {
                this.setState({position: i});

                break;
            }
        }
    },
    handleStopChange: function(e){
        this.setState({selectStopValue:e.target.value});
        var r = this.state.position;
        for (i=0; i<this.state.routes[r].RoutePointResponseList.length; i++) {
            var currentStop = this.state.routes[r].RoutePointResponseList[i];
            if(currentStop.LocationResponse.Address == e.target.value) {
                this.setState({
                    routePointId: currentStop.Id
                });
                break;
            }
        }
    console.log('routePointId', currentStop.Id);
    },
    onFirstNameChanged: function(event) {
        this.setState({
            firstName: event.target.value
        });
    },
    onLastNameChanged: function(event) {
        this.setState({
            lastName: event.target.value
        });
    },
    onStudentIdChanged: function(event) {
        this.setState({
            studentId: event.target.value
        });
    },
    onGradeChanged: function(event) {
        this.setState({
            grade: event.target.value
        });
    },
    onMaleChecked: function(event) {
        this.setState({
            gender: event.target.value
        });
    },
    onFemaleChecked: function(event) {
        this.setState({
            gender: event.target.value
        });
    },
    onAddress1Changed: function(event) {
        this.setState({
            address1: event.target.value
        });
    },
    onAddress2Changed: function(event) {
        this.setState({
            address2: event.target.value
        });
    },
    onCityChanged: function(event) {
        this.setState({
            city: event.target.value
        });
    },
    onStateChanged: function(event) {
        this.setState({
            state: event.target.value
        });
    },
    onZipChanged: function(event) {
        this.setState({
            zip: event.target.value
        });
    },
    onBackClick: function(event) {
        this.setState({
                    step: 0,
                    toastMessage: undefined
                });
    },
    removeToast: function(event) {
        this.setState({
            toastMessage: undefined
        });
    },
    onSubmitClick: function(event) {
        console.log('onSubmitClick', this.state.gender);
        var student = [],
            parents = [],
            address = [],
            pickupDropPoints = [],
            component = this;

        student = {
            Id :0,
            StudentId: this.state.studentId,
            FirstName: this.state.firstName,
            MiddleName: '',
            LastName: this.state.lastName,
            Gender: this.state.gender,
            IsKinderGartenStudent: 0,
            ProfilePicture: null,
            ProfilePictureThumb: null,
            CompanyId: this.state.companyId,
            Grade: this.state.grade,
            LocationId: 0,
            PickupDropPointId: 0,
            PickupDropBy: 0
        };
        parents = [{
            StudentId: this.state.studentId,
            GuardianId: 114,
            Relationship: 'Neighbor'
        }];
        address = {
            Address: this.state.address1,
            Street1: this.state.address1,
            Street2: this.state.address2,
            Zip: this.state.zip,
            City: this.state.city,
            State: this.state.state,
            Country:'United States of America',
            Longitude: null,
            Latitude: null,
            LocationSourceTypeId: 1,
            CompanyId: this.state.companyId,
            Id: 0,
            Status: 1
        };
        console.log('RoutePointId', this.state.routePointId);
        pickupDropPoints = [
            {
                Id: 0,
                RoutePointId: this.state.routePointId,
                IsPickupOrDrop: 1,
                PickupDropBy: 0,
                PickupDropTime:'7:45:16'
            },
            {
                Id: 0,
                RoutePointId: this.state.routePointId,
                IsPickupOrDrop: 2,
                PickupDropBy: 0,
                PickupDropTime: '12:45:16'
            }
        ];

        SchoolBusService.addStudents(
            student,
            parents,
            address,
            pickupDropPoints,
            this.state.sessionToken,
            function(res){
                if (res.body.Result) {
                    component.setState({toastMessage: 'Student Added Successfully!'});
                    //console.log('Student Added Successfully', JSON.stringify(res.body.Result));
                } else {
                    if(res.body.InfoMessages) {
                        component.setState({toastMessage: res.body.InfoMessages[0].Text + '...'});
                    } else {
                        component.setState({toastMessage: 'Something went wrong, please try again.'});
                    }
                    console.log('Something went wrong', res.text);
                }
        });
    },
    deleteStudent: function(studentId, event) {
        var component = this;
        SchoolBusService.deleteStudent(
            studentId,
            this.state.sessionToken,
            function(res) {
                if (res.body.Result) {
                    component.setState({toastMessage: 'Student deleted Successfully!'});
                    for(var i=0; i<component.state.students.length; i++) {
                        if(component.state.students[i].Id === studentId) {
                            console.log(component.state.students[i].Name);
                            component.state.students.splice(i, 1);
                            component.forceUpdate();
                            break;
                        }
                    }
                    //console.log('Student Added Successfully', JSON.stringify(res.body.Result));
                } else {
                    if(res.body.InfoMessages) {
                        component.setState({toastMessage: res.body.InfoMessages[0].Text + '...'});
                    } else {
                        component.setState({toastMessage: 'Something went wrong. Could not delete Student. Please try again.'});
                    }
                    console.log('Something went wrong', res.text);
                }
        });
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left narrow">
                    <input type="text" className="textbox" placeholder="Search students"/>
                    <div className="add-button" onClick={this.onAddClick}>
                        <i className="fa fa-plus"></i>
                    </div>
                </div>

                <div className="right wide">
                    <div className={'toast'+ (this.state.toastMessage ? ' active': ' ')}>
                        <div className="text">{this.state.toastMessage}</div>
                            <div className="remove-button">
                                <i className="fa fa-close" onClick={this.removeToast}></i>
                            </div>
                        </div>
                    {(steps[this.state.step])(this)}
                </div>
            </div>
        );
    }
});

module.exports = Students;
