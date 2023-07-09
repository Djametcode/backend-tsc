/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Reply = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  const [comment, setComment] = useState([]);
  const [count, setCount] = useState(0);

  const deleteComment = async (postId) => {
    try {
      const response = await axios.delete(
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/delete-comment/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setCount(count + 1);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyReply = async () => {
    try {
      const response = await axios.get(
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/my-comment?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setComment(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyReply();
  }, [count]);
  return (
    <>
      {comment.length === 0 ? (
        <div className=" w-full h-screen flex justify-center items-center">
          No Reply
        </div>
      ) : (
        <div>
          {comment.map((item) => (
            <>
              {item.postId === null ? null : (
                <div
                  className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
                >
                  <div className=" row-span-2">
                    <div className=" flex justify-start">
                      {item.postId.createdBy.avatar === "" ? (
                        <div>
                          <img
                            className=" w-12 h-12 object-cover rounded-full"
                            src="/Blank-Avatar.png"
                            alt=""
                          />
                        </div>
                      ) : (
                        <img
                          className=" w-12 h-12 object-cover rounded-full"
                          src={item.postId.createdBy.avatar}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <p>{item.postId.createdBy.username}</p>
                    <p className=" font-montserrat text-sm">
                      {item.postId.text}
                    </p>
                  </div>
                  {item.postId.images === "" ? null : (
                    <div>
                      <img
                        className=" rounded-lg"
                        src={item.postId.images}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              )}
              <div
                className={` relative border-b gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
              >
                <div
                  onClick={() => deleteComment(item._id)}
                  className=" cursor-pointer absolute right-3 top-3 bg-slate-200 rounded-lg p-3"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className=" w-6 h-6 text-black"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    />
                  </svg>
                </div>
                <div className=" row-span-2">
                  <div className=" flex justify-start">
                    {item.createdBy.avatar === "" ? (
                      <div>
                        <img
                          className=" w-12 h-12 object-cover rounded-full"
                          src="/Blank-Avatar.png"
                          alt=""
                        />
                      </div>
                    ) : (
                      <img
                        className=" w-12 h-12 object-cover rounded-full"
                        src={item.createdBy.avatar}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div>
                  <p>{item.createdBy.username}</p>
                  <p className=" font-montserrat text-sm">{item.commentText}</p>
                </div>
                {item.images === "" ? null : (
                  <div>
                    <img className=" rounded-lg" src={item.images} alt="" />
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Reply;