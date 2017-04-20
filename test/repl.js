require("./common/bootstrap");

exports["Repl"] = {
  setUp: function(done) {
    this.sandbox = sinon.sandbox.create();
    this.board = newBoard();
    done();
  },
  tearDown: function(done) {
    Board.purge();
    this.sandbox.restore();
    done();
  },
  instanceof: function(test) {
    test.expect(1);
    test.equal(Repl({ board: this.board }) instanceof Repl, true);
    test.done();
  },
  repl: function(test) {
    var io = new MockFirmata();
    var board = new Board({
      io: io,
      debug: false
    });

    test.expect(3);

    board.on("ready", function() {
      test.ok(this.repl === board.repl);
      test.ok(this.repl instanceof Repl);
      test.ok(this.repl.context);
      test.done();
    });

    io.emit("connect");
    io.emit("ready");
  },
  fwdExitEvent: function(test) {
    test.expect(1);

    var io = new MockFirmata();
    var board = new Board({
      io: io,
      debug: false
    });

    // Be extra-careful to guard against calling test.done twice here.
    // In some test runs on Travis we see this "reallyExit" stub called twice
    // (which shouldn't be possible, but is happening)
    // and when nodeunit's `test.done()` is called more than once in a test
    // it causes an error
    // > Cannot read property 'setUp' of undefined
    // See https://github.com/caolan/nodeunit/issues/234
    var calledTestDone = false;
    var reallyExit = this.sandbox.stub(process, "reallyExit", function() {
      if (!calledTestDone) {
        reallyExit.restore();
        calledTestDone = true;
        test.done();
      }
    });

    board.on("ready", function() {
      this.on("exit", function() {
        test.ok(true);
      });
      this.repl.close();
    });

    io.emit("connect");
    io.emit("ready");
  },

};
