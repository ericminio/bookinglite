pids=$(pidof /usr/bin/Xvfb)
if [ -n "$pids" ]; then
    echo "X already runnying"
else
    Xvfb :1 -screen 5 1024x768x8 &
    echo "Initializing X for headless browsing"
fi

export DISPLAY=:1.5