import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import Spinner from "../components/layouts/Spinner";
import UserRepoItem from "../components/users/UserRepoItem";
import { getUser, getUserRepos } from "../context/github/GithubAction";
import { data } from "autoprefixer";

const UserPage = () => {
  const { repos, user, loading, dispatch } = useContext(GithubContext);

  const params = useParams();

  const loadUser = async () => {
    const data = await getUser(params.login);
    dispatch({ type: "GET_USER", payload: data });
  };
  const loadRepos = async () => {
    const data = await getUserRepos(params.login);
    dispatch({ type: "GET_USER_REPOS", payload: data });
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    loadUser();
    loadRepos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back to search
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card-image-full">
              <figure>
                <img src={user.avatar_url} alt="" />
              </figure>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="h1 text-3x card-title">
                {user.name}
                <div className="ml-2 mr-1 badge badge-success">
                  {user.login}
                </div>
                {user.hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{user.bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={user.html_url}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-outline"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>

            <div className="w-full rounded-lg shadow-md bg-base-100 stats">
              {user.location && (
                <div className="stat">
                  <div className="stat-title text-md">location</div>
                  <div className="text-lg stat-value">{user.location}</div>
                </div>
              )}
              {user.blog && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="text-lg stat-value">
                    <a
                      href={`${user.blog}`}
                      rel="noreferrer"
                      target="_blank"
                      className="btn btn-outline"
                    >
                      {user.blog}
                    </a>
                  </div>
                </div>
              )}
              {user.twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="text-lg stat-value">
                    <a
                      href={`https://twitter.com/${user.twitter_username}`}
                      rel="noreferrer"
                      target="_blank"
                      className="btn btn-outline"
                    >
                      {user.twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full pay md-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {user.followers}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {user.following}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Repos</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {user.public_repos}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Gists</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {user.public_gists}
            </div>
          </div>
        </div>
        <div className="w-full pay md-6 rounded-lg shadow-md bg-base-100">
          {repos.length !== 0 &&
            repos.map((item) => <UserRepoItem repo={item} key={item.id} />)}
        </div>
      </div>
    </>
  );
};

export default UserPage;
