import './list.scss'

import LoadingSpinner from 'app/components/loadingSpinner/loadingSpinner';
import { ProductService } from 'app/services';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import List from './list';

const brand:Array<any> = []
  function ListContainer() {
    const [typesList, setTypesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [productsList, setProductsList] = useState('');
    const queryString: {
      brand: any[];
      type: any;
  } = 
      {
        brand: brand,
        type: '',
      }
    ;
    const [loading, setLoading] = useState(true);
    const [getType, setType] = useState<Array<any>>([]);
    const { code } = useParams(); 
    
  
    useEffect(() => {
        getProductData(code);
    }, [code]);// eslint-disable-line react-hooks/exhaustive-deps

  
    const getProductData = async(type:any) => {
      setType(type)
      const filter = type === '' ? {} : (queryString.type = {type} );
      const filteredProductsPageData = await ProductService.getFilteredProducts(filter);
      setPageState(filteredProductsPageData.data)
      // return filteredProductsPageData.data;
    }
  
    const setPageState = (filteredProductsPageData) => {
      if (filteredProductsPageData === undefined) {
        return;
      }
      const typesList = filteredProductsPageData.types;
      const brandsList = filteredProductsPageData.brands;
      const productsList = filteredProductsPageData.products;
      // this.setState({ productsList, typesList, brandsList, loading: false });
      setTypesList(typesList);
      setBrandsList(brandsList);
      setProductsList(productsList);
      setLoading(false);
    }
  
     const onFilterChecked = async (e:any, value:any) => {
          const isChecked = e.target.checked;
          const dataType = e.target.getAttribute('id');
          setQueryStringState(isChecked, dataType, value);
  
          const apiCall = await ProductService.getFilteredProducts(queryString);
          // setState({ productsList: apiCall.data.products });
          setProductsList(apiCall.data.products)
    };
  
    const setQueryStringState = (isChecked:boolean, dataType:any, value:any) => {
      if (isChecked) {
        brand.push(dataType);
        queryString.brand = brand;
        queryString.type = getType ? getType  : '';
        queryString.type = queryString.type.type === undefined ?
              queryString.type : queryString.type.type;
      } else {
        let index = queryString[value].indexOf(dataType);
        if (index !== -1) {
          queryString[value].splice(index, 1);
        }
        queryString.type = getType ? getType  : '';
      }
    }
    return (
      <Fragment>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <List
            onFilterChecked={onFilterChecked}
            typesList={typesList}
            brandsList={brandsList}
            productsList={productsList}
          />
        )}
      </Fragment>
    );
  }
// }

export default (ListContainer);
