import { useQuery } from "@tanstack/react-query";
import "./widgetSm.css";
import Visibility from '@mui/icons-material/Visibility';
import newRequest from "../../utils/newRequest";

export default function WidgetSm() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest
        .get(
          `/users/?new=true`
        )
        .then((res) => {
          return res.data;
        }),
  });


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : ( data.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
          <img
            src="/img/noavatar.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.firstName} {user.lastName}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        )))}
        
      </ul>
    </div>
  );
}