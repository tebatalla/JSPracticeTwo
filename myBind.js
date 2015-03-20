Function.prototype.myBind = function(context) {
  var fn = this;
  return (function () {
    fn.apply(context);
  });
};

function hello() {
  console.log("Hello! " + this.name);
}

var cat = {
  name: "Gizmo"
};

var person = {
  name: "Human"
};

hello.myBind(cat)();
hello.myBind(person)();
