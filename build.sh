cd $(dirname $0)/java
echo "Build started at $(date)"
javac *.java || {
  echo "Build failed."
  exit
}
echo "Build successful, running $1..."
java Main "$1"
echo "Stopped."
