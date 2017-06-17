import matplotlib.pyplot as plt


def f(x):
	return x**2 * 0.0015

fx = [i for i in range(0, 310, 10)]
fy = [f(i) for i in range(0, 310, 10)]

x = [2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 240, 260, 280, 300]
y = [0, 1,  1,  2,  3,  4,  7,  9,  11, 14, 16,  19,  21,  25,  30,  34,  40,  43,  48,  55,  60,  73,  86,  103, 118, 134]

plt.xlabel('nb. corps')
plt.ylabel('temps (ms)')

label_f, = plt.plot(fx, fy, label='$f(x)=ax^2$')
label_data, = plt.plot(x, y, 'rs', linewidth=2, label='donnees')

plt.legend(handles=[label_f, label_data], loc=0)

plt.show()
