import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import {productData} from "../../dummyData";
import { useQuery } from '@tanstack/react-query';
import newRequest from "../../utils/newRequest";

export default function Product() {
    const {id} = useParams();
    console.log(id);

    const { isLoading, error, data } = useQuery({
        queryKey: ["product"],
        queryFn: () =>
          newRequest.get(`/products/${id}`).then((res) => {
            return res.data;
          }),
    });

      console.log(data)
      console.log(error)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      {isLoading ? ("loading") : error ? ("something went wrong!") : (
      <div className="productBottomContainer">
      <div className="productRight">
          <div className="productRightTop">
          <div className="productInfoTop">
                  <img src={data.cover} alt="" className="productInfoImg" />
                  <span className="productName">{data.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Id :</span>
                      <span className="productInfoValue">{data && data._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Total Sales :</span>
                      <span className="productInfoValue">8</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Total Cost :</span>
                      <span className="productInfoValue">$1600</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Total Income :</span>
                      <span className="productInfoValue">$240</span>
                  </div>
              </div>
              
          </div>
          <div className="productRightBottom">
          <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
      </div>
      <div className="productLeft">
      {data && (
        <>
        <div className="productInfoItemRightTop">
          <h2>{data.title}</h2> 
        </div>
        <div className="productInfoImgcontainer">
          {data.imgs.map(img => (
              <img className="productInfoImgcontainerimg" src={img} alt="" />
          ))}  
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Unit Price :</span>
            <span className="productInfoRightValue">${data.price}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Brand :</span>
            <span className="productInfoRightValue">{data.brand}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Category :</span>
            <span className="productInfoRightValue">{data.cat}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Color :</span>
            <span className="productInfoRightValue">{data.color}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Available Sizes :</span>
            <span className="productInfoRightValue">{data.size.map(s => (s + " , "))}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Available Stock :</span>
            <span className="productInfoRightValue">{data.stock}</span>
        </div>
        <div className="productInfoItemRight">
            <span className="productInfoRightKey">Unit Cost :</span>
            <span className="productInfoRightValue">${data.cost}</span>
        </div>
        <div className="updatebtncontainer">
          <button className="updatebtn">Update</button>
        </div>
        </>
        )}
      </div>
      </div>
      )} 
    </div>
  );
}