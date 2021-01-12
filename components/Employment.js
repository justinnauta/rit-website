// Represents the employment section
class Employment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            intro: [],
            degreeStats: [],
            employers: [],
            careers: [],
            coopTable: [],
            employmentTable: []
        };

        // Make the XHR call
        XHR('/employment/').done(json => {
            this.setState({
                apiLoaded: true,
                intro: json["introduction"],
                degreeStats: json["degreeStatistics"],
                employers: json["employers"],
                careers: json["careers"],
                coopTable: json["coopTable"],
                employmentTable: json["employmentTable"]
            });

            // Format the tables using the DataTable plugin
            $('#employmentTable').DataTable();
            $('#coopTable').DataTable();
            $('#degreeStats').tooltip();
        }).fail(_ => this.setState({ failed: true }));
    }

    // Swaps between the two tables (employment & co-op)
    // e: The clicked button
    changeTable(e) {
        const empTable = document.querySelector('#employmentTableContainer');
        const coopTable = document.querySelector('#coopTableContainer');
        const empButton = document.querySelector('#employmentTableBtn');
        const coopBtn = document.querySelector('#coopTableBtn')

        if (e.target == empButton) {
            empTable.classList.remove('is-hidden');
            coopTable.classList.add('is-hidden');

            empButton.classList.add('is-selected');
            empButton.classList.add('is-primary');
            coopBtn.classList.remove('is-selected');
            coopBtn.classList.remove('is-primary');
        } else {
            empTable.classList.add('is-hidden');
            coopTable.classList.remove('is-hidden');

            empButton.classList.remove('is-selected');
            empButton.classList.remove('is-primary');
            coopBtn.classList.add('is-selected');
            coopBtn.classList.add('is-primary');
        }
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <div id="employmentSection" className="section has-background-light">
                    <div>
                        {/* Intro */}
                        <h3 className="title">{this.state.intro.title}</h3>
                        {this.state.intro["content"].map((value, index) => {
                            return (
                                <div className="block" key={index}>
                                    <h3 className="subtitle">{value["title"]}</h3>
                                    <p>{value["description"]}</p>
                                </div>
                            );
                        })}

                        {/* Table Buttons */}
                        <div className="buttons has-addons is-centered pt-6">
                            <button id="employmentTableBtn" className="button is-primary is-selected" onClick={this.changeTable}>{this.state.employmentTable["title"]}</button>
                            <button id="coopTableBtn" className="button" onClick={this.changeTable}>{this.state.coopTable["title"]}</button>
                        </div>

                        {/* Employment Table */}
                        <div id="employmentTableContainer">
                            <table id="employmentTable" className="display" style={{ width: 100 + '%' }}>
                                <thead>
                                    <tr>
                                        <th>Employer</th>
                                        <th>Degree</th>
                                        <th>City</th>
                                        <th>Job Title</th>
                                        <th>Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.employmentTable["professionalEmploymentInformation"].map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    {Object.values(value).map((v, i) => {
                                                        return <td key={i}>{v}</td>;
                                                    })}
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Co-Op Table */}
                        <div id="coopTableContainer" className="is-hidden">
                            <table id="coopTable" className="display" style={{ width: 100 + '%' }}>
                                <thead>
                                    <tr>
                                        <th>Employer</th>
                                        <th>Degree</th>
                                        <th>City</th>
                                        <th>Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.coopTable["coopInformation"].map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    {Object.values(value).map((v, i) => {
                                                        return <td key={i}>{v}</td>;
                                                    })}
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <br />

                        {/* Degree Stats */}
                        <div className="py-6 my-6">
                            <h3 className="title is-size-4 has-text-centered">{this.state.degreeStats["title"]}</h3>
                            <h4 className="subtitle has-text-centered is-size-6">Hover to find out more!</h4>
                            <div className="py-6 my-6">
                                <div id="degreeStats" className="columns">
                                    {this.state.degreeStats["statistics"].map((value, index) => {
                                        return (
                                            <strong className="column has-text-centered has-text-primary is-size-3" key={index} title={value["description"]}>{value["value"]}</strong>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="columns is-vcentered">
                            {/* Employers */}
                            <div className="column has-text-centered">
                                <h3 className="title is-size-4">{this.state.employers["title"]}</h3>
                                <div className="content">
                                    {this.state.employers["employerNames"].map((value, index) => {
                                        return <span key={index}>{value}<br /></span>;
                                    })}
                                </div>
                            </div>

                            {/* Employment Map */}
                            <div className="column is-half has-text-centered">
                                <h3 className="title is-size-4">Where Students Work</h3>
                                <iframe id="employmentMap" src="http://ist.rit.edu/api/map.php" title="Where our students work!" />
                            </div>

                            {/* Careers */}
                            <div className="column has-text-centered">
                                <h3 className="title is-size-4">{this.state.careers["title"]}</h3>
                                <div className="content">
                                    {this.state.careers["careerNames"].map((value, index) => {
                                        return <span key={index}>{value}<br /></span>;
                                    })}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}
