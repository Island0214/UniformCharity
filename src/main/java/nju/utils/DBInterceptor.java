package nju.utils;

import nju.domain.Order;
import nju.domain.User;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Created by keenan on 22/05/2017.
 */
@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})
})
public class DBInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        String key = "20170522";
        String methodName = invocation.getMethod().getName();
        Object parameter = invocation.getArgs()[1];
        if (parameter instanceof User) {
            User user = (User) parameter;
            if (methodName.equals("update")) {
                user.setUsername(EncryptionUtil.encrypt(key, user.getUsername()));
                user.setPassword(EncryptionUtil.encrypt(key, user.getPassword()));
                user.setWechatID(EncryptionUtil.encrypt(key, user.getWechatID()));
                user.setPhone(EncryptionUtil.encrypt(key, user.getPhone()));
                user.setStudentRealName(EncryptionUtil.encrypt(key, user.getStudentRealName()));
                user.setEmail(EncryptionUtil.encrypt(key, user.getEmail()));
                user.setPersonID(EncryptionUtil.encrypt(key, user.getPersonID()));
//                user.setPassword(Digests.md5(user.getPassword().getBytes()));
            }
        } else if (parameter instanceof Order) {
            Order order = (Order) parameter;
            if (methodName.equals("update")) {
                order.setBuyerID(EncryptionUtil.encrypt(key, order.getBuyerID()));
                order.setDonorID(EncryptionUtil.encrypt(key, order.getDonorID()));
            }
        }

        Object returnValue = invocation.proceed();
        if (returnValue instanceof ArrayList<?>) {
            List<?> list = (ArrayList<?>) returnValue;
            for (Object val : list) {
                if (val instanceof User) {
                    User user = (User) val;
                    user.setUsername(EncryptionUtil.decrypt(key, user.getUsername()));
                    user.setPassword(EncryptionUtil.decrypt(key, user.getPassword()));
                    user.setWechatID(EncryptionUtil.decrypt(key, user.getWechatID()));
                    user.setPhone(EncryptionUtil.decrypt(key, user.getPhone()));
                    user.setStudentRealName(EncryptionUtil.decrypt(key, user.getStudentRealName()));
                    user.setEmail(EncryptionUtil.decrypt(key, user.getEmail()));
                    user.setPersonID(EncryptionUtil.decrypt(key, user.getPersonID()));
                } else if (val instanceof Order) {
                    Order order = (Order) val;
                    order.setBuyerID(EncryptionUtil.decrypt(key, order.getBuyerID()));
                    order.setDonorID(EncryptionUtil.decrypt(key, order.getDonorID()));
                }


            }
        }
        return returnValue;
    }

    @Override
    public Object plugin(Object o) {
        return Plugin.wrap(o, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}