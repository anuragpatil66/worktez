/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Swapnil Bankar <swapnilbankar1010@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { updateTeamDetails, getTeam } = require("../lib");

exports.addGitToken = function(request, response) {
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;
  const gitToken = request.body.data.GitToken;

  let status = 200;
  let result = { data: "Error in updating team" };

  const promise1 = getTeam(orgDomain, teamName)
      .then((team) => {
        if (team) {
          const updateJson = {
            GitToken: gitToken,
          };
          updateTeamDetails(updateJson, orgDomain, teamName);
          result = { data: "Team Updated Successfully" };
          console.log("Team Updated Successfully");
        } else {
          status = 500;
          result = { data: "Error: Team doesn't exist" };
          console.log("Error: Team doesn't exist");
        }
      })
      .catch((error) => {
        status = 500;
        console.log("Error: ", error);
      });

  const Promises = [promise1];
  Promise.all(Promises)
      .then(() => {
        return response.status(status).send(result);
      })
      .catch((error) => {
        result = { data: error };
        console.error("Error updating Team", error);
        return response.status(status).send(result);
      });
};
