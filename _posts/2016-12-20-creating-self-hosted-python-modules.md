---
layout: post
title: Creating Self-Hosted Python Modules
description: A short tutorial on creating python modules and a self-hosted pip server to allow installation of them.
categories: programming
extra_styles: syntax.css
---

_The following assumes Python 3.x on Windows and pip version 8.1.1 or earlier_

## Creating A Module

Required files:

* `setup.py`
* `setup.cfg`
* `README`
* `MANIFEST.in`

and a folder containing the module itself.

_NOTE: README can be one of: README, README.txt or README.rst_

All files can be blank except for `setup.py`.

Minimal content of `setup.py`:

```python
from setuptools import setup, find_packages

setup(name='modulename',
      version='0.1.0',
      description='Put description here',
      author='Name',
      author_email='name@example.com',
      url='module url',
      packages=find_packages(exclude=['docs', 'tests']))
```

To build the module package, run the command: `python setup.py sdist` from the root of the project.

This will create a folder `dist` with the file `modulename-0.1.0.zip`

For more details see [the documentation](https://packaging.python.org/distributing/).

### Using external version.txt

To read the version number from a file:

```python
from setuptools import setup, find_packages

with open('version.txt') as f:
    version = f.readline().rstrip()

setup(name='modulename',
      version=version,
      description='Put description here',
      author='Name',
      author_email='name@example.com',
      url='module url',
      packages=find_packages(exclude=['docs', 'tests']))
```

_NOTE from pip verison 8.1.2 onwards, the modulename should replace dots with hyphens; otherwise pip won't be able to find them on the self-hosted server_

`version.txt` will also need to be added to the `MANIFEST.in` file:

```
include version.txt
```

## Hosting A Repository

To host the server, put the `modulename-0.1.0.zip` file into a folder `archive\modulename`, then run `python -m http.server 9000` from the `archive` folder.

For more details see [the documentation](https://packaging.python.org/self_hosted_repository/) and [also](http://docs.python-guide.org/en/latest/shipping/packaging/).

## Installing The Module

`pip install --extra-index-url http://localhost:9000/ modulename`

It's probably worth doing this in a virtual environment to avoid corrupting the main python installation:

```
> python -m venv venv
> venv\Scripts\activate.bat
> pip install --extra-index-url http://localhost:9000/ modulename
> ... do stuff ...
> deactivate
```

