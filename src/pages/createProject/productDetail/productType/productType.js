import React, { useState, useEffect, useContext } from "react";
import { Col, Layout, Row } from "antd";
import { ContentTitle, ContentSubTitle } from "../../../../components/global";
import NavHeader from "../../../../components/createProject/NavHeader";
import CustomRadio from "../../../../components/createProject/customRadio";

import { getProductTypes, getProjectRessources } from '../../../../store/service';

import { StoreContext } from '../../../../store/store';

const { Content } = Layout;
let index = document.location.pathname.split('/').pop();

const ProductType = (props) => {

    const { projectId, product, prodIt } = props;
    const { state, dispatch } = useContext(StoreContext);

    const [types, setTypes] = useState([]);

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const typeInStore = state.productTypes;
    const error = state.error;
    const errorMsg = state.errorMsg;

    useEffect(() => {
      const fetchProducts = async () => {
        const projectRessources = await getProjectRessources(projectId);
        const productTypes = await getProductTypes();

        if (productTypes.status === 200 && projectRessources.status === 200) {
            const result = productTypes.data;

            result.map((r) => {
                r.displayed = projectRessources.data.project[0].product[prodIt].gamme !== undefined
                    ? projectRessources.data.project[0].product[prodIt].gamme.some(type => {
                        if (type.id === r.id) return true;

                        return false;
                }) : false;
            });
            setTypes(result);
        }
      }

      fetchProducts();
    }, []);

    useEffect(() => {
        const cpy = [...typeInStore];
        const cpySelectedTypes = [...types].filter(type => type.displayed === true);

        cpy[prodIt] = cpySelectedTypes;
        dispatch({ type: 'setProductTypes', productTypes: cpy });
    }, [types]);

    useEffect(() => {
        setErr(error);
        setErrMsg(errorMsg);
    }, [error, errorMsg]);

    return (
        <Layout>
            <NavHeader title={`${product?.name} : catégorie`} />
            <Content
            style={{
                margin: "0",
                padding: "70px 100px 10px 100px",
                minHeight: 280,
                backgroundColor: "white",
            }}
            >
                <ContentSubTitle>
                {product?.name} ({product?.quantity} pièce{`${product?.quantity > 1 ? 's' : ''}`})
                </ContentSubTitle>
                <ContentTitle>Gamme de votre produit</ContentTitle>
                <ContentSubTitle>
                Luxe, sportswear ou encore prêt-à-porter, indiquez ci-dessous la ligne que vous souhaitez donner à votre marque.
                </ContentSubTitle>
                <center
                    style={{
                    fontFamily: "Gelion Medium",
                    padding: "40px 100px 0 100px",
                    }}
                >
                    <p style={{color: 'red'}}>{errMsg}</p>
                    {types?.map((type, index) => {
                        return <CustomRadio
                            key={index}
                            title={type.title}
                            onClick={() => {
                                const cpy = [...types];

                                cpy.forEach((c) => c.displayed = false);

                                cpy[index].displayed = true;
                                setTypes(cpy);
                                dispatch({ type: 'setError', error: false, errorMsg: '' });
                            }}
                            isSelected={type.displayed}
                        />
                    })}
                </center>
            </Content>
        </Layout>
    );
}

export default ProductType;

/*class ProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 0,
      date: "",
      displayGammes: [],
      products: this.props.products
    };
  }

  handleClick(index, e) {
    e.preventDefault()
    if (this.state.categories)
      if (this.state.categories[index])
        this.setState({ categories: { ...this.state.categories, [index]: false } })
      else
        this.setState({ categories: { ...this.state.categories, [index]: true } })
    else
      this.setState({ categories: { [index]: true } })
    console.log(this.state)
  }

  displayContent() {
    this.state.displayGammes.map((value, index) => {
      index += 1;
      return <CustomRadio
        key={index}
        onClick={() => this.handleClick(index)}
        isSelected={this.state.selectedType === index}
        title={value}
      />
    })
  }

  componentDidMount() {
    axios.get(`${API}/api/gamme`)
      .then(res => {
        index = document.location.pathname.split('/').pop();
        setTimeout(() => {
          this.setState({ displayGammes: res.data })
        }, 200)
        console.log(res.data)
      })
  }

  componentDidUpdate () {
    index = document.location.pathname.split('/').pop();
  }

  render() {
    return (
      <Layout>
        <NavHeader title={`${this.state.products[index]?.name} : gamme`} />
        <Content
          style={{
            margin: "0",
            padding: "70px 100px 10px 100px",
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <ContentSubTitle>
            {this.state.products[index]?.name} ({this.state.products[index]?.quantity} pièces)
          </ContentSubTitle>
          <ContentTitle>Gamme de votre produit</ContentTitle>
          <ContentSubTitle>
            Durant cet OnBoarding, plusieurs questions vont vous êtres posées afin de comprendre au mieux votre activité afin d’établir une offre correspondant à vos besoins adapté à votre projet.
          </ContentSubTitle>
          <center
            style={{
              fontFamily: "Gelion Medium",
              padding: "40px 100px 0 100px",
            }}
          >
            {this.state.displayGammes?.map((gamme, index) => {
              return (
                <CustomRadio
                  key={this.state.displayGammes[index].id}
                  title={gamme.title}
                  onClick={(e) => this.handleClick(index, e)}
                  isSelected={this.state.categories && this.state.categories[index]}
                />)
            })}
          </center>
        </Content>
      </Layout>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    projectId: state.projectId,
    products: state.products
  }
}

export default connect(mapStateToProps, null)(ProductType)
*/