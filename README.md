# :globe_with_meridians: REPOmmend
## Network Analysis Project: Building a Recommendation System from a Bipartite Network

This repository is used to save the progress of the Fall 2021 Network Analysis Project. The goal of this project was to build a recommendation system for github repositories, based on the 2009 GitHub bipartite network, representing User-Repository-Watches (unweighted) relationships. A similar pipeline as used within this project can be applied generically to any bipartite graph, to build a recommendation for either of the two classes.

While the focus of this project was on understanding, applying and argue in favor or against theoretical concepts of network analysis using real-life data, the final product - a recommendation graph (that was statically saved for a max of 5 recommendations) - was  translated into a simple web-app. Below, you can find all the important resources:

:arrow_forward: **[Web application](https://na-project.netlify.app/)**

 :arrow_forward: **[Project presentation](https://docs.google.com/presentation/d/13dyLBafxCt2VNjRtrBzkrYpuNhHQViyT52FdB1JcBHQ/edit?usp=sharing)**

 :arrow_forward: **[Course notes](https://ludekcizinsky.notion.site/fae38de7e03c4b8c81dc2ae416291faf?v=00e52a0941d4498791bfc78b2570ce37)**

# Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/LudekCizinsky"><img src="https://github.com/LudekCizinsky.png?size=100" width="100px;" alt=""/><br /><sub><b>Ludek Cizinsky</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/jonas-mika"><img src="https://github.com/jonas-mika.png?size=100" width="100px;" alt=""/><br /><sub><b>Jonas-Mika Senghaas</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/lukyrasocha"><img src="https://github.com/lukyrasocha.png?size=100" width="100px;" alt=""/><br /><sub><b>Lukas Rasocha</b></sub></a><br /></td>
 </tr>
</table>


# Get started

## Virtual Environment (Dependencies)

The project was (excluding the web-app) entirely written in `Python` and makes use of several external libraries. If you want to run the scripts and notebooks yourself, it is recommened to create a virtual environment (using the python environment manager) of you choice and then install all dependencies of it from the `requirements.txt`. Follow the following steps for create a stadard python `venv`:

1. Create a virtual environemnt: `python3 -m venv [name of venv]`

2. Activate the venv using: `source [name of env]/bin/activate`. You can decativate using the command `deactivate`

3. Update `pip`: `pip install --upgrade pip`

4. Install all dependencies: `pip install -r <path/to/requirement.txt>`

## Github API

We use the public GitHub API to dynamically query additional metadata to be displayed in our web-app and to gain additional metadata for our recommendation system. While the API has free access, using an API token increases the number of API requests to 5000/hour. If you want to run the scripts yourself, you must create your own free, GitHub API token. Follow the following steps:

1. Visit your personal [GitHub Token Settings](https://github.com/settings/tokens)
2. Create a new personal token and set the scope to `public_repo`.
3. Copy the token and save it into a python file in the following location `csripts/envvars.py`. Format your file as follows:

	```
	GITHUB=TOKEN=[your_token]
	```
4. The file is automatically ignored by `.gitignore`.
