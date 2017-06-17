import numpy as np
import numpy.random as rd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

pt1_x = 0
pt1_y = 0
pt1_m = 1

pt2_x = 0
pt2_y = 0.6
pt2_m = 4

def distance(x1, y1, x2, y2):
	dx = x2 - x1
	dy = y2 - y1
	return(dx, dy)

def grav(m, x1, y1, x2, y2):
	dx, dy = distance(x1, y1, x2, y2)
	d = np.sqrt(dx**2 + dy**2)
	gx = m * dx / d**3
	gy = m * dy / d**3
	return(gx, gy)


def grav1(x, y):
	return grav(pt1_m, x, y, pt1_x, pt1_y)

def grav2(x, y):
	return grav(pt2_m, x, y, pt2_x, pt2_y)

def fun(x, y):
	g1_x, g1_y = grav1(x, y)
	g2_x, g2_y = grav2(x, y)
	gx, gy = g1_x + g2_x, g1_y + g2_y
	
	return -np.sqrt(gx**2 + gy**2)

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
x = y = np.arange(-1.0, 1.0, 0.01)
X, Y = np.meshgrid(x, y)
zs = np.array([fun(x,y) for x,y in zip(np.ravel(X), np.ravel(Y))])
Z = zs.reshape(X.shape)

ax.set_zlim(-100.0, 10.0)
ax.plot_wireframe(X, Y, Z, rstride=7, cstride=7)

plt.show()
