# summarise.py
# file that contains code to generate complex summaries including all relevant network 
# statistics and visualisation for a generic graph.

# last modified: 09.11.21
# author: jonas-mika senghaas

import os
import sys
from time import time
from datetime import date
import networkx as nx

from markdown import markdown
import pdfkit

local_path = os.path.dirname(os.path.realpath(__file__))
if local_path not in sys.path:
    sys.path.append(local_path)

# custom imports
from metrics import export_metrics
from plotting import generate_plots


def generate_markdown(G, filepath='.', name='unnamed', save_name=None, plain=True):
    if save_name == None:
        save_name = name

    savepath = f'{filepath}/{name}'
    os.makedirs(savepath) if not os.path.exists(savepath) else None

    s = f"# Generic Summary of Unipartite Graph **{name.title()}**\n---\n"
    s += f"Created: {date.today().strftime('%d/%m/%y')}\n"

    start = time()
    stats = export_metrics(G) 
    generate_plots(G, name=name, filepath=f'{savepath}/assets')
    end = time()
    s += f"Computation Time: {round(end - start, 2)}sec\n\n"

    # metrics
    for section in stats:
        s += f'## {section}\n---\n'
        if not plain:
            s += '<table>\n<tr><th align="center"><img width="441" height="1"><p><small>Network Statistic</small></p></th><th align="center"><img width="441" height="1"><p><small>Result</small></p></th></tr>\n'
        else:
            s += '| Network Statistics | Results |\n'
            s += '|---|---|\n'

        for func_name, res in stats[section].items():
            if not plain:
                s += f"<tr><td>{func_name}</td><td>{res if not None else 'TimeoutException'}</td></tr>\n"
            else: 
                s += f"| {func_name} | {res if not None else 'timeoutException'} |\n"
        if not plain:
            s += '</table>\n\n'


    # plots
    for file in os.listdir(f'{savepath}/assets'):
        title = file[:-4].replace('_', ' ').title()
        s += f'## {title} Plot\n---\n'
        s += f'![image](./assets/{file})'

    # write all string to markdown file
    with open(f'{savepath}/{save_name}.md', 'w') as outfile:
        outfile.write(s)


def generate_pdf(filepath, name, save_name=None):
    if not save_name:
        save_name=name
    with open(f'{filepath}/{name}/{save_name}.md', 'r') as f:
        html_text = markdown(f.read(), output_format='html4')

    pdfkit.from_string(html_text, f'{filepath}/{name}/{save_name}.pdf')

def write_metadata(metadata, filepath='.', name):
    filepath = f"{filepath}/{name}.txt"
    with open(filepath, 'w') as outfile:
        outfile.write('=== METADATA: Backboning ===\n\n\n')
        for method in metadata:
            outfile.write(f"Method: {method.replace('_', ' ').title()}\n")
            outfile.write(f"{'-'*len(method)}\n")
            for stat, res in metadata[method].items():
                outfile.write(f"{stat.replace('_', ' ').title()}: {res}\n")
            outfile.write('\n')

def generate_summary(G, filepath, name='unnamed'):
    generate_markdown(G, filepath, name=name, save_name=name+'_plain', plain=True)
    generate_markdown(G, filepath, name=name, plain=False)
    #generate_pdf(filepath, name)


if __name__ == '__main__':
    # test code
    G = nx.karate_club_graph()
    generate_summary(G, filepath='../data/graph_summaries', name='karate')