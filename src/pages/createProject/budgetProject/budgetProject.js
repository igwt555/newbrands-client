import React, { useState, useEffect, useContext } from "react";
import { Layout, Row } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../components/global";
import NavHeader from "../../../components/createProject/NavHeader";
import CustomRadio from "../../../components/createProject/customRadio";

import { StoreContext } from '../../../store/store';

import './index.scss';

const { Content } = Layout;

const BudgetProject = () => {

    const [value, setValue] = useState('');
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { state, dispatch } = useContext(StoreContext);

    const budgetInStore = state.budget;
    const error = state.error;
    const errorMsg = state.errorMsg;

    const possibleBudgets = ['Moins de 5 000€', 'Entre 5 000€ à 20 000€',
        'Entre 20 000€ à 50 000€', 'Plus de 50 000€'];

    useEffect(() => {
        console.log(budgetInStore);
        if (budgetInStore !== undefined && budgetInStore.length > 0)
            setValue(budgetInStore);
    }, []);

    useEffect(() => {
        dispatch({ type: 'setBudget', budget: value });
    }, [value]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    return (
        <Layout>
            <NavHeader title="Budget (facultatif)" />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px 20px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentTitle>Budget alloué à ce projet</ContentTitle>
                <ContentSubTitle>
                L’information budget nous permet de choisir les usines et fournisseurs les plus susceptibles de correspondre à la réalisation de vos produits
                </ContentSubTitle>
                <center
                    style={{
                    padding: "40px 100px 0 100px",
                    fontFamily: "Gelion Medium",
                    fontSize: "24px",
                    }}
                >
                    <Row>
                        {
                            possibleBudgets.map((d, i) => {
                                return <CustomRadio
                                key={i}
                                onClick={() => setValue(d)}
                                isSelected={value === d}
                                title={d}
                                />
                            })
                        }
                    </Row>

                    <p className="budgetErrorMessage">{errMsg}</p>
                </center>
            </Content>
        </Layout>
    );
}

/*class BudgetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBudget: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    if (this.state.selectedBudget !== value) {
      this.setState({ selectedBudget: value });
    } else {
      this.setState({ selectedBudget: "" });
    }
  }

  render() {
    return (
      <Layout>
        <NavHeader title="Budget (facultatif)" />
        <Content
          style={{
            margin: "0",
            padding: "70px 100px 20px 100px",
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <ContentTitle>Quel est votre budget ?</ContentTitle>
          <ContentSubTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </ContentSubTitle>
          <center
            style={{
              padding: "40px 100px 0 100px",
              fontFamily: "Gelion Medium",
              fontSize: "24px",
            }}
          >
            <Row>
              <CustomRadio
                onClick={() => this.handleClick("<5000")}
                isSelected={this.state.selectedBudget === "<5000"}
                title="Moins de 5 000€"
              />
              <CustomRadio
                onClick={() => this.handleClick("<20 000")}
                isSelected={this.state.selectedBudget === "<20 000"}
                title="Entre 5 000€ et 20 000€"
              />
              <CustomRadio
                onClick={() => this.handleClick("<50 000")}
                isSelected={this.state.selectedBudget === "<50 000"}
                title="Entre 20 000€ à 50 000€"
              />
              <CustomRadio
                onClick={() => this.handleClick(">50 000")}
                isSelected={this.state.selectedBudget === ">50 000"}
                title="Plus de 50 000€"
              />
            </Row>
          </center>
        </Content>
      </Layout>
    );
  }
}*/

export default BudgetProject;
