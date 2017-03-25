# node-bootstrap

Quickly create a node project with a handful of options.  I got tired of spending all day getting a new React+Redux app setup, so I built this thing.

## Installation

Might as well install this one globally if you want to use it.  Or install
it locally if you'd like, but that seems silly.

```bash
npm install -g @mgwalker/node-bootstrap
```

## Usage

From the directory where you want to create your new module, run:

```bash
node-bootstrap [plugins]
```

For example, to create a React project with Redux tucked neatly into a docker environment, under an MIT license:

```bash
node-bootstrap react redux docker license=mit
```

You can specify a list of plugins, some with options.  The following plugins are currently supported:

|plugin|description|
|---|---|
|react|Installs the latest version of [react](), creates an app entry point, sets up [webpack](),  modifies the eslint config, and updates the `build` script in `package.json`.
|redux|Installs the latest version of [redux]() and sets up a basic reducer and dispatch actions. Invokes the `react` plugin if it hasn't already executed.
|express|Installs the latest version of [express]() and sets up a very simple web server with a single endpoint.  Note that this plugin does ***not*** serve your web application with express - the intent is that the express app will serve as an API.
|docker|Creates Dockerfiles and a `docker-compose.yaml` to start everything up. When `docker` is enabled, npm modules are not installed in your local environment - instead, they are installed when the docker containers are created.
|license|Create a `LICENSE.md` file.  Takes an optional parameter of the SPDX identifier of the license to use. Available licenses are `BSD-2-Clause`, `BSD-3-Clause`, `CC0-1.0`, `ISC`, and `MIT`.  Default is `ISC`.  SPDX identifier is not case sensitive.<br><br>To specify the parameter, add `=<spdx>` to the plugin:<br><br>`node-bootstrap license=mit`

All projects are configured with [eslint](), and the lint configuration is modified by the plugins, as appropriate.

---
> Yeah, `plugins` isn't really the best word here, but it's the best I've got right now.  :)
