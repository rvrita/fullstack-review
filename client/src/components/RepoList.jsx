import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
        {props.repos.map((repo, index) => {
          return (
            <tr key={index}>
              <td>Repo name: <a href={repo.url} target="blank">{repo.name}</a></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default RepoList;