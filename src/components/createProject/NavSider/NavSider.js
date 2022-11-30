import React, { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { LogoBrand, SiderTitle } from "../../global";
import Logo from "../../../assets/img/logo-newbrands.svg";
import styled from "styled-components";
import { useEffect } from "react";

import { StoreContext } from '../../../store/store';

import { connect, useDispatch } from 'react-redux';

import './index.scss';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

function NavSider(props) {
    //const { t } = useTranslation("common");
    //const dispatch = useDispatch();

    const { state, dispatch } = useContext(StoreContext);

    const productListInStore = state.productList;
    
    const { currentPage, currentProduct, currentProductStep, workflowSteps, productWorkflow } = props;

    const [workflowStepList, setWorkflowStepList] = useState(workflowSteps);
    const [productWorkflowSteps, setProductWorkflowSteps] = useState(productWorkflow);

    useEffect(() => {
        setWorkflowStepList(workflowSteps);
    }, [workflowSteps]);

    useEffect(() => {
        setProductWorkflowSteps(productWorkflow);
    }, [productWorkflow]);

    const getStepName = (stepName) => {
        if (stepName === 'file')
            return 'Documents';
        if (stepName === 'country')
            return 'Pays de confection';
        return stepName;
    }

    return (
        <Sider
        trigger={null}
        style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
        }}
        >
        <Link to="/createProject/">
            <LogoBrand src={Logo} alt="NewBrands" />
        </Link>
        <SiderTitle>Parlez nous de votre projet</SiderTitle>
        {/*<Menu
            mode="inline"
            defaultSelectedKeys={[`${props.maxPage}`]}
            selectedKeys={[`${props.currentPage}`]}
            style={{ backgroundColor: "#F8F5F5" }}
        >
            {
                workflowStepList !== undefined && workflowStepList.map((d, index) => {
                    if (d.stepName === 'Produits' && typeof d.subSteps !== 'undefined')
                        return <SubMenu
                            className="customclass"
                            key={index}
                            title={d.stepName}
                        >
                            {
                                productListInStore.map((step, i) => {
                                    return <SubMenu
                                        key={i}
                                        className="customclass"
                                        title={step.name}
                                    >
                                        {
                                            workflowStepList[index].subSteps !== undefined
                                            && productWorkflowSteps[i] !== undefined
                                            && productWorkflowSteps[i].map((subS, j) => {
                                                return <CustomItem
                                                    key={j}
                                                    className="customclass"
                                                >
                                                    <label>{subS.nameStep}</label>
                                                </CustomItem>
                                            })
                                        }
                                    </SubMenu>
                                })
                            }
                        </SubMenu>
                    else
                        return <CustomItem
                            key={index}
                            className="customclass"
                        >
                            <label>{d.stepName}</label>
                        </CustomItem>
                })
            }
        </Menu>*/}

        <ul className="sideNavMenu">
            {
                workflowStepList !== undefined && workflowStepList.map((d, index) => {
                    if (d.stepName === 'Produits' && typeof d.subSteps !== 'undefined')
                        return <ul className="subSideNavMenu">
                            <ul className="subSideNavMenuItem">
                                <div className="subSideNavMenuItemName">
                                    <p>{d.stepName}</p>
                                    {/*<p>-</p>*/}
                                </div>
                                {
                                    productListInStore.map((step, i) => {
                                        return <ul className="subSideNavMenuItemChildren show">
                                            <ul className="subSideNavMenu">
                                                <ul className="subSideNavMenuItem">
                                                    <div className="subSideNavMenuItemName">
                                                        <p>{step.name.length > 0 ? step.name : `Produit ${i + 1}`}</p>
                                                        {/*<p>-</p>*/}
                                                    </div>
                                                    <ul className="subSideNavMenuItemChildren show">
                                                        {
                                                            workflowStepList[index].subSteps !== undefined
                                                            && productWorkflowSteps[i] !== undefined
                                                            && productWorkflowSteps[i].map((subS, j) => {
                                                                return <li className={`${currentPage === index && currentProduct === i && currentProductStep === j ? 'current' : ''}`}>{getStepName(subS.nameStep)}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </ul>
                                            </ul>
                                        </ul>
                                    })
                                }
                            </ul>
                        </ul>
                    else
                        return <li className={`${currentPage === index && d.stepName.length > 0 ? 'current' : ''}`}>{d.stepName}</li>
                })
            }
            {/*<li>Type</li>
            <li>Noms des produits</li>
            <ul className="subSideNavMenu">
                <ul className="subSideNavMenuItem">
                    <div className="subSideNavMenuItemName">
                        <p>Ok</p>
                        <p>-</p>
                    </div>
                    <ul className="subSideNavMenuItemChildren">
                        <ul className="subSideNavMenu">
                            <ul className="subSideNavMenuItem">
                                <div className="subSideNavMenuItemName">
                                    <p>Ok</p>
                                    <p>-</p>
                                </div>
                                <ul className="subSideNavMenuItemChildren">
                                    <li>Catégorie</li>
                                    <li>Grammage</li>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                
            </ul>
            <ul className="subSideNavMenu">
                <ul className="subSideNavMenuItem">
                    <div className="subSideNavMenuItemName">
                        <p>Ok</p>
                        <p>-</p>
                    </div>
                    <ul className="subSideNavMenuItemChildren">
                        <ul className="subSideNavMenu">
                            <ul className="subSideNavMenuItem">
                                <div className="subSideNavMenuItemName">
                                    <p>Ok</p>
                                    <p>-</p>
                                </div>
                                <ul className="subSideNavMenuItemChildren">
                                    <li>Catégorie</li>
                                    <li>Grammage</li>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                
            </ul>*/}
        </ul>
        </Sider>
    );
}



const mapStateToProps = (state) => {
  return {
      projectId: state.projectId,
      workflow: state.workflow,
      products: state.products
  }
}

export default connect(mapStateToProps, null)(NavSider)


const LinkButton = styled(Link)`
  color: black !important;
`;

const CustomItem = styled(Item)`
  background: none !important;
  color: black !important;
`;
