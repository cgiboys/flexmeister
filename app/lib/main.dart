import "package:flutter/material.dart";

void main() {
  runApp(const MyApp());
}

/// Definition of [MyApp]. This is the root of the app.
/// App settings and the start view are applied here.
class MyApp extends StatelessWidget {
  /// Constructor of [MyApp].
  const MyApp({super.key});

  @override
  Widget build(final BuildContext context) => MaterialApp(
        title: "Flexmeister",
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const MyHomePage(title: "Flutter Demo Home Page"),
      );
}

/// The start view that is shown when the app starts.
class MyHomePage extends StatefulWidget {
  /// Constructor of [MyHomePage].
  /// Required parameters:
  /// * String [title]
  const MyHomePage({required this.title, super.key});

  /// Title shown in the appbar.
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(final BuildContext context) => Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                "You have pushed the button this many times:",
              ),
              Text(
                "$_counter",
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _incrementCounter,
          tooltip: "Increment",
          child: const Icon(Icons.add),
        ),
      );
}
