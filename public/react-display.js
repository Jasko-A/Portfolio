/*Create by Jasmin Adzic*/

//component for main Login screen
class Login extends React.Component {
	
  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onLogIn(username, password)
  }		
  
  render () {
    return(
        React.createElement('form',{onSubmit: this.handleSignIn.bind(this)},
        		React.createElement('h2',{id: 'title'},"Log In"),
        		React.createElement('input', {type: 'text', className: 'input-box', id: 'input-user', ref: 'username', placeholder: 'Username'}),
        		React.createElement('input', {type: 'password', className: 'input-box', id: 'input-pass', ref: 'password', placeholder: 'Password'}),
        		React.createElement('input', {type: 'submit', value: 'Log In', id: 'login-button'})
        	)

      );
  }
}

//Compnonet for screen after login including the popup
class Counter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      popup: 0,
      count: 0,
      tempCount: 0
    };
    this.incrementer = this.incrementer.bind(this);
    this.onPopup = this.onPopup.bind(this);
    this.keepCount = this.keepCount.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  keepCount (){
    this.setState({popup: 0})
  }
  updateCount () {
    this.setState({count: this.state.tempCount, popup: 0})
  }
  
  onPopup() {
    axios.post('?'+this.state.count, this.state.count).then(res => {
      this.setState({tempCount: res.data, popup: 1})
    });
  }

  incrementer() {
    var currCount = this.state.count;
    var nextCount;
    if(currCount == 0)
    {
      nextCount = 1;
    }
    else {
      nextCount = currCount * 2
    }
    currCount = nextCount;
    this.setState({tempCount: currCount})
  }


  
	render () {

      console.log("Pop up state: " + this.state.popup);
      return (
        React.createElement('div',{className: this.props.className, id: 'count-display'},
            React.createElement('h2', {id: 'user-name'}, "Welcome " + this.props.username + ' !'),
            React.createElement('h2', {id: 'count-title'}, "The count is: " + this.state.count),
            React.createElement('button', {type: 'button', id: 'popup-button', onClick: this.onPopup.bind(this)}, "Increment ?"),
            React.createElement('button', {type: 'button', id: 'logout-button', onClick: this.props.onLogOut}, "Log Out"),
            React.createElement('div',{className: "popup", style:{display: (this.state.popup) ? 'flex' : 'none'}},
                  React.createElement('div',{id:"popup-main"}, 
                      React.createElement('div',{id:"curr-count"},
                        React.createElement('h3',{id:"curr-count-heading"},"Current Count: " + this.state.count),
                        React.createElement('button', {type: 'button', className: 'hvr-sweep-to-right', id: 'inc-button', onClick: this.keepCount.bind(this)}, "Cancel")
                      ),
                      React.createElement('div',{id:"next-count"},
                        React.createElement('h3',{id:"next-count-heading"},"Next Count: " + this.state.tempCount),
                        React.createElement('button', {type: 'button', className: 'hvr-sweep-to-left', id: 'inc-button', onClick: this.updateCount.bind(this)}, "Confirm")
                      )
                  )
              )
        )
      );  	
	}
}

class School extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            davis_text: ["University of California, Davis.","Sep. 2016 \u2014 June 2018"],
            deanza_text: ["De Anza College. Cupertino,CA", "Sep. 2014 \u2014 June 2016"]
        };
    }

    render() {
        if(this.props.id == "davis")
        {
            return(
                React.createElement('div',{className: this.props.className},
                    React.createElement('div',{id: this.props.id},this.state.davis_text[0]),
                    React.createElement('div',{className: "duration"},this.state.davis_text[1])
                )
            );
        }
        if(this.props.id == "deanza")
        {
            return(
                React.createElement('div',{className: this.props.className},
                    React.createElement('div',{id: this.props.id},this.state.deanza_text[0]),
                    React.createElement('div',{className: "duration"},this.state.deanza_text[1])
                )
            );
        }
        
    }
};
class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render () {
        if(this.props.school == "davis")
        {
            return (
                React.createElement("ul", {className: "list", id: this.props.school+'-list', style:{display: (this.props.popup) ? "block" : "none"}},
                    React.createElement("li",{},"Operating Systems"),
                    React.createElement("li",{},"Web Programming"),
                    React.createElement("li",{},"Machine Learning"),
                    React.createElement("li",{},"Computer Architecture"),
                    React.createElement("li",{},"Computer Networks"),
                    React.createElement("li",{},"Algorithm Design"),
                    React.createElement("li",{},"Discrete Math"),
                    React.createElement("li",{},"Abstract Math"),
                    React.createElement("li",{},"Probability and Statistics CS")
                )
            );
        }
        if(this.props.school == "deanza")
        {
            return (
                React.createElement("ul", {className: "list", id: this.props.school+'-list', style:{display: (this.props.popup) ? "block" : "none"}},
                    React.createElement("li",{},"C++ Data Structures"),
                    React.createElement("li",{},"C++ OOP"),
                    React.createElement("li",{},"Object Oriented Analysis & Design"),
                    React.createElement("li",{},"Java Programming")
                    
                )
            );
        }

    }
};

class School_info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: this.props.school,
            arrow: 0,
            school_degree: ["B. S. in Computer Science", "G. E. & CS courses for transfer"]
        };

    }

    change_arrow() {
        if(this.state.arrow == 0)
            this.setState({arrow: 1})
        else
            this.setState({arrow: 0})
    }

    render() {
        return(
            React.createElement('div',{},
                React.createElement('div',{className: this.props.className},
                    React.createElement('i',{className: (this.state.arrow) ? "fas fa-angle-down": "fas fa-angle-right", onClick: this.change_arrow.bind(this)}),
                    React.createElement('div', {id: "degree"}, this.props.schoolDegree)
                ),
                React.createElement(Courses, {popup: this.state.arrow, school: this.state.school}, "HELLO")
            )
            
        );
    }
};

class Work extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: ["SABRO Communications Inc.", "EtainPower", "UNITRANS", "Santa Clara Social Services Agency"],
            dates: ["June 2013 \u2014 Present", "March 2018 \u2014 June 2018", "Oct. 2017 \u2014 Dec. 2017", "June 2015 \u2014 Sep. 2015"],
            roles: ["Low-voltage Technician", "Software Engineer, Web", "IT Assistant", "Webmaster Intern"]
        };
    }

    render() {
        return (
            React.createElement('div', {className: this.props.className},
                
                React.createElement('div', {className: "job-desc"},
                    React.createElement('img',{src:"./images/SABRO_main_logo.png", id: "sabro-logo"}),
                    React.createElement('div',{className: "job-title"},
                        React.createElement('div',{},this.state.jobs[0]),
                        React.createElement('div',{},this.state.dates[0])
                    ),
                    React.createElement('div',{className: "job-position"},this.state.roles[0])
                ),
                
                React.createElement('div',{className: "job-desc"},
                    React.createElement('img',{src:"./images/etainpower.png", id: "etain-logo"}),
                    React.createElement('div',{className: "job-title"},
                        React.createElement('div',{},this.state.jobs[1]),
                        React.createElement('div',{},this.state.dates[1])
                    ),
                    React.createElement('div',{className: "job-position"},this.state.roles[1])
                ),
                React.createElement('div',{className: "job-desc"},
                    React.createElement('img',{src:"./images/unitrans.jpg", id: "uni-logo"}),
                    React.createElement('div',{className: "job-title"},
                        React.createElement('div',{},this.state.jobs[2]),
                        React.createElement('div',{},this.state.dates[2])
                    ),
                    React.createElement('div',{className: "job-position"},this.state.roles[2])
                ),
                React.createElement('div',{className: "job-desc"},
                    React.createElement('img',{src:"./images/santaclara.png", id: "santa-logo"}),
                    React.createElement('div',{className: "job-title"},
                        React.createElement('div',{},this.state.jobs[3]),
                        React.createElement('div',{},this.state.dates[3])
                    ),
                    React.createElement('div',{className: "job-position"},this.state.roles[3])
                )
          
            )
            
        );
    }

};

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ['Job Search Data Analysis', 'discover.ai', 'Machine Learning Jokes Database', 'USDA Food Search', 'School Gradebook System'],
            desc: ['Analysis and Report of my on-going quest to get a career in Software Engineering', 'Awarded Best Health & Wellness hack of HackDavis 2018', 'Developed a drug predicting AI using deep neural network working on a google cloud platform', 'Created a database to host a large amount of jokes that would later be used to predict jokes the user likes based on user attributes', 'Developed various data structures for fast insertion and searching of foods in the USDA database', 'Developed in Java the gradebook uses OOP techniques to have different user interfaces work seemlessly for teachers and students'],
            technologies: {
                jobAnalysis:['python','matplotlib','pandas','keras','numpy'],
                discoverAI:['Javascript','React.js','HTML','CSS','Bootstrap','Python','Keras','matplotlib','pandas','numpy','Google Cloud PLatform'],
                jokes:['mySQL','Javascript','Python','Django','HTML', 'CSS', 'Bootstrap', 'Azure'],
                usda:['C++'],
                gradebook:['Java'],
            },
            links:['https://github.com/Jasko-A/Job-Application-Statistics','https://github.com/Jasko-A/discover.ai','https://devpost.com/software/discover-ai#updates', 'https://github.com/Jasko-A/database-project', 'https://github.com/Jasko-A/CIS-Project-Final', 'https://github.com/Jasko-A/Java-GradeBookSystem']
        };
    }

    render() {
        return (
            React.createElement('div', {className:this.props.className},
                React.createElement('div',{className: "project-desc"},
                    React.createElement('div',{className: "project-title"},
                        React.createElement('div',{},this.state.title[0]),
                        React.createElement('div',{className:"links"},
                            React.createElement('a',{href: this.state.links[0], target:"_blank"},
                                React.createElement('i', {className:"fab fa-github"},)
                            )
                            
                        )
                    ),
                    React.createElement('div',{className: "project-body"},
                        React.createElement('div', {className: "project-info"},this.state.desc[0]),
                        React.createElement('div', {className: "project-techs"},
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jobAnalysis[0]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jobAnalysis[1]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jobAnalysis[2]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jobAnalysis[3]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jobAnalysis[4])
                        )
                    )
                ),
                React.createElement('div',{className: "project-desc"},
                    React.createElement('div',{className: "project-title"},
                        React.createElement('div',{},this.state.title[1]),
                        React.createElement('div',{className:"links"},
                            React.createElement('a',{href:this.state.links[1], target:"_blank"},
                                React.createElement('i', {className:"fab fa-github"},)
                            ),
                            React.createElement('a',{href: this.state.links[2], target:"_blank"},
                                React.createElement('i', {className:"fas fa-external-link-alt"},)
                            )
                            
                        )
                    ),
                    React.createElement('div',{className: "project-body"},
                        React.createElement('div', {className: "project-info"},this.state.desc[1]),
                        React.createElement('div', {className: "project-techs"},
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[0]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[1]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[2]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[3]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[4]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[5]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[6]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[7]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[8]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[9]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.discoverAI[10])
                        )
                    )
                ),
                React.createElement('div',{className: "project-desc"},
                    React.createElement('div',{className: "project-title"},
                        React.createElement('div',{},this.state.title[2]),
                        React.createElement('div',{className:"links"},
                            React.createElement('a',{href: this.state.links[3], target:"_blank"},
                                React.createElement('i', {className:"fab fa-github"},)
                            )
                            
                        )
                    ),
                    React.createElement('div',{className: "project-body"},
                        React.createElement('div', {className: "project-info"},this.state.desc[2]),
                        React.createElement('div', {className: "project-techs"},
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[0]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[1]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[2]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[3]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[4]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[5]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[6]),
                            React.createElement('div',{className:"tech-button"},this.state.technologies.jokes[7])
                        )
                    )
                ),
                React.createElement('div',{className: "project-desc"},
                    React.createElement('div',{className: "project-title"},
                        React.createElement('div',{},this.state.title[3]),
                        React.createElement('div',{className:"links"},
                            React.createElement('a',{href: this.state.links[4], target:"_blank"},
                                React.createElement('i', {className:"fab fa-github"},)
                            )
                            
                        )
                    ),
                    React.createElement('div',{className: "project-body"},
                        React.createElement('div', {className: "project-info"},this.state.desc[3]),
                        React.createElement('div', {className: "project-techs"},
                            React.createElement('div',{className:"tech-button"},this.state.technologies.usda[0])
                        )
                    )
                ),
                React.createElement('div',{className: "project-desc"},
                    React.createElement('div',{className: "project-title"},
                        React.createElement('div',{},this.state.title[4]),
                        React.createElement('div',{className:"links"},
                            React.createElement('a',{href: this.state.links[5], target:"_blank"},
                                React.createElement('i', {className:"fab fa-github"},)
                            )
                            
                        )
                    ),
                    React.createElement('div',{className: "project-body"},
                        React.createElement('div', {className: "project-info"},this.state.desc[4]),
                        React.createElement('div', {className: "project-techs"},
                            React.createElement('div',{className:"tech-button"},this.state.technologies.gradebook[0])
                        )
                    )
                )
            )
        );
    }
};


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            React.createElement('div',{className: this.props.className},
                React.createElement('h2',{className: "body-title", id: "about"},"About Me"),
                React.createElement('div',{className: "main-body-section"}, "I have great knowledge in fields of developement such as full-stack web development, applicaiton development, and machine learning. Always had a knack for anything computer related and am eager to get my hands on new technology and hack them."),
                React.createElement('h2',{className: "body-title", id: "education-title"},"Education"),
                React.createElement('div',{className: "main-body-section", id: "education"},
                    React.createElement(School,{className: "school", id: "davis"}),
                    React.createElement(School_info,{className: "school-extra", school: "davis", schoolDegree: "B. S. in Computer Science"}),
                    React.createElement(School,{className: "school", id: "deanza"}),
                    React.createElement(School_info,{className: "school-extra", school: "deanza", schoolDegree: "G. E. & CS courses for transfer"})
                        
                    
                ),
                React.createElement('h2',{className: "body-title", id: "work-title"},"Work Experience"),
                React.createElement('div', {className: "main-body-section", id:"work-experience"},
                    React.createElement(Work, {className: "jobs"},)
                ),
                React.createElement('h2',{className: "body-title", id:"projects"},"Projects"),
                React.createElement('div', {className: "main-body-section", id:"projects-body"},
                    React.createElement(Projects, {className: "projects"},)
                )  
            )   
        );
    }
};

// The react component for the App
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    
  }
  //changes the state after login success
  

  render() {
    return( 
      React.createElement(Main,{className: 'all-info'})
    );
  }  
};



//start the react App
const reactContainer = document.getElementById("main-body");

var reactApp = ReactDOM.render(React.createElement(App),reactContainer);

window.dispatchEvent(new Event('resize'));












