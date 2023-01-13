# collab-editor

Nothing serious, just to showcase collaborative editing possibilites that socket.io and node has.

Instalation:

```npm install```

Start:

```node app.js```

Application hosts itself on ```https://localhost:8080```

What does it do:

It's a collaborative piece of form, where every connected user can see what other users had chosen in the form.

What's cluser.js:

If You want to spawn more than one instance of the application, run ```node cluster.js``` it will spawn the exact number of instances that are configured in ```config.json```. If You put number there that is bigger the number of cores of Your machine, in will take as much as it can.
